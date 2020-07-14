import { v4 as uuidV4 } from "uuid";
const { google } = require("googleapis");
const sanity = require("@sanity/client");
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

const EVENTS_SYNC_ENDPOINT =
  "https://johnnymoses.netlify.app/.netlify/functions/calendar-events-sync/";

let calendarClient, sanityClient;

export const handler = async event => {
  // satisfy preflight
  if (event.httpMethod === "OPTIONS") {
    return returnResponse(200, "", {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Max-Age": 3600,
    });
  }

  if (event.httpMethod !== "POST") {
    return returnResponse(400, "");
  }

  const appToken = event.headers["x-jm-app-token"];
  const appMethod = event.headers["x-jm-app-method"];

  if (!appToken || appToken !== APP_TOKEN) {
    returnResponse(400, "");
  }

  setSanityClient();
  setGoogleCalendarClient();

  if (appMethod == "renew") {
    await renewNotificationChannels();
    return returnResponse(200, "");
  }

  let calendarDocument;
  try {
    calendarDocument = JSON.parse(event.body);
  } catch (error) {
    returnError("Couldn't parse request body")(error);
  }

  if (appMethod === "stop") {
    await stopNotificationChannel(calendarDocument);
    return returnResponse(200, "");
  }

  if (appMethod == "watch") {
    await createNotificationChannel(calendarDocument);
    return returnResponse(200, "");
  }

  returnResponse(400, "");
};

async function createNotificationChannel({ _id: id, calendarId }) {
  const hmac = crypto
    .createHmac("sha256", APP_TOKEN)
    .update(`${calendarId} ${id}`)
    .digest("hex");

  const params = {
    calendarId,
    requestBody: {
      id: uuidV4(),
      address: EVENTS_SYNC_ENDPOINT,
      type: "web_hook",
      token: encode(calendarId, id, hmac),
      expiration: hoursFromNowAsUnixTimestampInMiliseconds(1),
    },
  };

  let err, response;
  while (!err && !response) {
    try {
      response = await calendarClient.events.watch(params);
    } catch (error) {
      if (
        error.code === 400 &&
        error.errors.some(({ reason }) => reason == "channelIdNotUnique")
      ) {
        params.requestBody.id = uuidV4();
      } else {
        err = error;
      }
    }
  }

  if (err) {
    return returnError("Couldn't create notification channel")(err);
  }

  console.log(`Successfully created Google Calendar notification channel`);

  await sanityClient
    .patch(id)
    .set({
      resourceId: response.data.resourceId,
      channelId: response.data.id,
      channelExpiration: response.data.expiration,
      channelToken: response.data.token,
    })
    .commit()
    .catch(returnError("Sanity error"));

  console.log(`Successfully patched calendar '${id}' in Sanity`);

  return;
}

async function stopNotificationChannel({
  _id: id,
  channelId,
  channelToken,
  resourceId,
}) {
  const response = await calendarClient.channels
    .stop({
      requestBody: {
        id: channelId,
        resourceId: resourceId,
        token: channelToken,
      },
    })
    .catch(returnError("Could not stop notification channel"));

  if (response.status !== 204) {
    returnError("Unexpected response. Expected 204")(response);
  }

  console.log("Successfully stopped Google Calendar notification channel");

  await sanityClient
    .patch(id)
    .unset([
      "resourceId",
      "channelId",
      "channelExpiration",
      "channelToken",
      "nextSyncToken",
    ])
    .commit()
    .catch(returnError(`Could not patch calendar '${id}'`));

  console.log(`Successfully patched calendar '${id}' in Sanity`);

  return;
}

async function renewNotificationChannels() {
  const calendars = await sanityClient
    .fetch("*[_type==$type]", { type: "calendar" })
    .catch(returnError("Couldn't fetch calendars"));

  if (!calendars || calendars.length < 1) {
    console.log("No calendars exist");
    return;
  }

  const tasks = calendars.map(async calendarDocument => {
    const { _id: id, channelExpiration } = calendarDocument;
    if (
      channelExpiration &&
      channelExpiration < hoursFromNowAsUnixTimestampInMiliseconds(1)
    ) {
      await stopNotificationChannel(calendarDocument);
      return createNotificationChannel(calendarDocument);
    } else {
      console.log(`Skipping calendar ${id}: Renewal unnecessary.`);
    }

    return Promise.resolve();
  });

  await Promise.all(tasks).catch(
    returnError("Couldn't renew notification channels")
  );

  return;
}

function setSanityClient() {
  sanityClient = sanity({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    token: SANITY_API_TOKEN,
    useCdn: false,
  });

  return;
}

function setGoogleCalendarClient() {
  let credentials;

  try {
    credentials = JSON.parse(GOOGLE_SERVICE_ACCT_KEY);
  } catch (error) {
    returnError("Couldn't parse credentials")(error);
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
  });

  calendarClient = google.calendar({
    version: "v3",
    auth,
  });

  return;
}

function hoursFromNowAsUnixTimestampInMiliseconds(n = 1) {
  let now = new Date();
  let then = new Date();
  then.setTime(now.getTime() + n * 60 * 60 * 1000);
  return then.getTime();
}

function daysFromNowAsUnixTimestampInMiliseconds(n = 1) {
  let now = new Date();
  let then = new Date();
  then.setTime(now.getTime() + n * 24 * 60 * 60 * 1000);
  return then.getTime();
}
