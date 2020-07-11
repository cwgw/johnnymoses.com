const { google } = require("googleapis");
const sanityClient = require("@sanity/client");
const crypto = require('crypto');

const { decode, returnResponse } = require("./utils/request-config");

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
    const response = await calendar.events.list({ calendarId });
    if (response.status !== 200) {
      console.error(
        `Could not fetch events from Google Calendar ${calendarId}`
      );
      return response;
    }

    console.log(`Successfully retrieved inital sync token`);
    const { nextSyncToken } = response.data;
    client
      .transaction()
      .createIfNotExists({
        _id: documentId,
        _type: "calendar",
      })
      .patch(documentId, p => p.set({ nextSyncToken }))
      .commit()
      .then(() => {
        console.log(`Successfully patched calendar '${documentId}' in Sanity`);
        return returnResponse(200, "");
      })
      .catch(error => {
        console.error("Sanity error:", error);
        return returnResponse(500, {
          error: "An internal server error has occurred",
        });
      });
  }

  if (resourceState === "exists") {
    try {
      // fetch document for its sync token
      const doc = await client.fetch(`*[_id==$id][0]`, { id: documentId });
      if (!doc) {
        // calendar is missing
        // it may have been deleted after creating this notification channel
      }
      if (!doc.nextSyncToken) {
        // this probably shouldn't happen
      }
      // fetch modified events
      const res = await calendar.events.list({
        calendarId,
        syncToken: doc.nextSyncToken,
      });
      if (res.status !== 200 || res.data) {
        // something went wrong
      }
      const { items, nextSyncToken } = res.data;
      if (!items || items.length < 1) {
        // no modified events
        // this probably shouldn't happen either
      }
      const patchCalendar = client
        .patch(documentId)
        .set({ nextSyncToken })
        .commit();
      const patchEvents = items.map(item => {
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
          .commit();
      });

      await Promise.all([patchCalendar, ...patchEvents]);
      return returnResponse(200, "");
    } catch (error) {
      console.error(error);
      return returnResponse(500, {
        error: "An internal server error has occurred",
      });
    }
  }

  return returnResponse(400, "");
};

// {
//   kind: 'calendar#event',
//   etag: '"3188151511896000"',
//   id: '2qujrf9okv8f04nlac1atnm0cm',
//   status: 'confirmed',
//   htmlLink: 'https://www.google.com/calendar/event?eid=MnF1anJmOW9rdjhmMDRubGFjMWF0bm0wY20gam9obm55bW9zZXMuY29tQG0',
//   created: '2020-07-06T22:49:15.000Z',
//   updated: '2020-07-06T22:49:15.948Z',
//   summary: 'AN EVENT',
//   description: 'Spain this time! Look at that!',
//   location: 'Barcelona, Spain',
//   creator: [Object],
//   organizer: [Object],
//   start: [Object],
//   end: [Object],
//   iCalUID: '2qujrf9okv8f04nlac1atnm0cm@google.com',
//   sequence: 0,
//   guestsCanInviteOthers: false,
//   guestsCanSeeOtherGuests: false,
//   reminders: [Object]
// },
