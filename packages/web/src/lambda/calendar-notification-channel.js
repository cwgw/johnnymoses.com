const { google } = require("googleapis");
const { v5: uuidV5 } = require("uuid");
const sanityClient = require("@sanity/client");
const crypto = require("crypto");

const {
  encode,
  returnResponse,
  returnError,
} = require("./utils/request-config");

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

const EVENTS_SYNC_ENDPOINT =
  "https://johnnymoses.netlify.app/.netlify/functions/calendar-events-sync/";
const UID_NAMESPACE = uuidV5("https://johnnymoses.netlify.app", uuidV5.URL);

const hoursFromNowAsUnixTimestampInMiliseconds = (n = 1) => {
  let now = new Date();
  let then = new Date();
  then.setTime(now.getTime() + n * 60 * 60 * 1000);
  return then.getTime();
};

module.exports.handler = async event => {
  // satisfy preflight
  if (event.httpMethod === "OPTIONS") {
    return returnResponse(200, "", {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Max-Age": 3600,
    });
  }

  if (event.httpMethod !== "POST" || !event.body) {
    return returnResponse(400, "");
  }

  const appToken = event.headers["x-app-token"];
  const appMethod = event.headers["x-app-method"];

  if (!appToken || appToken !== APP_TOKEN) {
    returnResponse(400, { error: `Invalid app token` });
  }

  let credentials, calendarDocument;

  try {
    credentials = JSON.parse(GOOGLE_SERVICE_ACCT_KEY);
  } catch (error) {
    returnError("Couldn't parse credentials")(error);
  }

  try {
    calendarDocument = JSON.parse(event.body);
  } catch (error) {
    returnError("Couldn't parse request body")(error);
  }

  const { calendarId, _id: documentId } = calendarDocument;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
  });

  const calendar = google.calendar({
    version: "v3",
    auth,
  });

  if (appMethod === "stop") {
    const response = await calendar.channels
      .stop({
        requestBody: {
          id: calendarDocument.channelId,
          resourceId: calendarDocument.resourceId,
          token: calendarDocument.channelToken,
        },
      })
      .catch(returnError("Could not stop notification channel"));

    if (response.status !== 204) {
      console.log("Unexpected response. Expected status 204\n", response);
    } else {
      console.log("Successfully stopped Google Calendar notification channel");
    }

    const fields = [
      "resourceId",
      "channelId",
      "channelExpiration",
      "channelToken",
      "nextSyncToken",
    ];
    await client
      .patch(documentId)
      .unset(fields)
      .commit()
      .catch(returnError(`Could not patch calendar '${documentId}'`));

    console.log(`Successfully patched calendar '${documentId}' in Sanity`);

    return returnResponse(200, "");
  }

  const hmac = crypto
    .createHmac("sha256", APP_TOKEN)
    .update(`${calendarId} ${documentId}`)
    .digest("hex");

  const params = {
    calendarId,
    requestBody: {
      id: uuidV5(calendarId, UID_NAMESPACE),
      address: EVENTS_SYNC_ENDPOINT,
      type: "web_hook",
      token: encode(calendarId, documentId, hmac),
      expiration: hoursFromNowAsUnixTimestampInMiliseconds(1 / 6),
    },
  };

  const channel = await calendar.events
    .watch(params)
    .catch(
      returnError("Could not create Google Calendar notification channel")
    );

  console.log(`Successfully created Google Calendar notification channel`);

  const documentData = {
    resourceId: channel.data.resourceId,
    channelId: channel.data.id,
    channelExpiration: channel.data.expiration,
    channelToken: channel.data.token,
  };

  await client
    .patch(documentId)
    .set(documentData)
    .commit()
    .catch(returnError("Sanity error"));

  console.log(`Successfully patched calendar '${documentId}' in Sanity`);

  return returnResponse(200, "");
};
