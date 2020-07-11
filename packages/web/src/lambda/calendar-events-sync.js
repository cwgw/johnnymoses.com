const { google } = require("googleapis");
const sanityClient = require("@sanity/client");
const crypto = require("crypto");

const { decode, returnResponse, returnError } = require("./utils/request-config");

const {
  GOOGLE_SERVICE_ACCT_KEY,
  SANITY_API_TOKEN,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
  APP_TOKEN,
} = process.env;

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  useCdn: false,
});

module.exports.handler = async event => {
  const channelToken = event.headers["x-goog-channel-token"];

  // validate token
  if (!channelToken) {
    returnResponse(400, { error: `Invalid token` });
  }

  const [calendarId, documentId, hmac] = decode(channelToken);
  const generated = crypto
    .createHmac("sha256", APP_TOKEN)
    .update(`${calendarId} ${documentId}`)
    .digest("hex");

  if (hmac !== generated) {
    returnResponse(400, { error: `Invalid token` });
  }

  let credentials;
  try {
    credentials = JSON.parse(GOOGLE_SERVICE_ACCT_KEY);
  } catch (error) {
    console.error(error);
    return returnResponse(400, { error: "Couldn't parse credentials" });
  }

  const resourceState = event.headers["x-goog-resource-state"];

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
  });

  const calendar = google.calendar({
    version: "v3",
    auth,
  });

  if (resourceState === "sync") {
    const response = await calendar.events
      .list({ calendarId })
      .catch(
        returnError(`Could not fetch events from Google Calendar ${calendarId}`)
      );

    if (response.status !== 200) {
      console.log("Unexpected response. Expected status 204\n", response);
    } else {
      console.log("Successfully retrieved inital sync token");
    }

    const { nextSyncToken } = response.data;

    await client
      .transaction()
      .createIfNotExists({ _id: documentId, _type: "calendar" })
      .patch(documentId, p => p.set({ nextSyncToken }))
      .commit()
      .catch(returnError("Sanity error"));

    console.log(`Successfully patched calendar '${documentId}' in Sanity`);
    return returnResponse(200, "");
  }

  if (resourceState === "exists") {
    // try {
    // fetch document for its sync token
    const doc = await client
      .fetch(`*[_id==$id][0]`, { id: documentId })
      .catch(
        returnError(`Could not fetch calendar '${documentId}'`)
      );

    if (!doc) {
      console.log(`Calendar '${documentId}' can't be retrieved. Maybe it's been deleted?`);
      returnResponse(200, "");
    }

    // fetch modified events
    const res = await calendar.events
      .list({
        calendarId,
        syncToken: doc.nextSyncToken,
      })
      .catch(
        returnError(`Could not fetch events from Google Calendar ${calendarId}`)
      );

    if (res.status !== 200 || res.data) {
      console.log("Unexpected response. Expected status 204\n", response);
    } else {
      console.log("Successfully retrieved modified events");
    }
  
    const { items, nextSyncToken } = res.data;

    const patchCalendar = client
      .patch(documentId)
      .set({ nextSyncToken })
      .commit()
      .catch(
        returnError(`Couldn't patch calendar ${documentId}`)
      );

    const patchEvents = items.map(item => {
      if (!item.start.dateTime) {
        // item is probably deleted
        console.log("\n", { event }, "\n",);
        return Promise.resolve()
      }
      
      const eventDocument = {
        _type: "event",
        _id: item.id,
      };
      const eventDocumentData = {
        "content.main.title": item.summary,
        "content.main.start": item.start.dateTime,
        "content.main.end": item.end.dateTime,
        "content.main.location": item.location,
        "content.main.description": item.description,
        "content.main.uid": item.iCalUID,
        "content.main.created": item.created,
        "content.main.updated": item.updated,
        "content.main.htmlLink": item.htmlLink,
      };
      return client
        .transaction()
        .createIfNotExists(eventDocument)
        .patch(item.id, p => p.set(eventDocumentData))
        .commit()
        .catch(
          returnError("Sanity error")
        );
    });

    await Promise.all([patchCalendar, ...patchEvents]);
    return returnResponse(200, "");
  }

  if (resourceState === "not_exists") {
    console.log("\n", "We got one! type is 'not_exists'", "\n");
    console.log({ event });
  }
  
  return returnResponse(400, "");
};
