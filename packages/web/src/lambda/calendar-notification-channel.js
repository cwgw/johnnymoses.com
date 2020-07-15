import { v4 as uuidV4 } from "uuid";
const { google } = require("googleapis");
const sanity = require("@sanity/client");
const crypto = require("crypto");

const { encode, returnResponse } = require("./utils/request-config");

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

  const appToken = event.headers["x-jm-app-token"];
  const appMethod = event.headers["x-jm-app-method"];

  if (!appToken || appToken !== APP_TOKEN || event.httpMethod !== "POST") {
    returnResponse(400, "");
  }

  if (!appMethod) {
    returnResponse(400, { error: "No 'X-JM-App-Method' header provided" });
  }

  setSanityClient();
  setGoogleCalendarClient();

  if (appMethod == "renew") {
    const [error] = await renewNotificationChannels();
    if (error) {
      return returnResponse(500, { error });
    }

    return returnResponse(204, "");
  }

  let calendarDocument;
  try {
    calendarDocument = JSON.parse(event.body);
  } catch (error) {
    returnResponse(400, "");
  }

  if (appMethod == "watch") {
    let [error, data] = await createNotificationChannel(calendarDocument);
    if (!error) {
      [error] = await updateCalendarDocument(calendarDocument._id, {
        resourceId: data.resourceId,
        channelId: data.id,
        channelExpiration: data.expiration,
        channelToken: data.token,
      });
    }

    if (error) {
      return returnResponse(500, { error });
    }

    return returnResponse(204, "");
  }

  if (appMethod === "stop") {
    let [error] = await stopNotificationChannel(calendarDocument);
    if (!error) {
      [error] = await unsetCalendarDocumentFields(calendarDocument._id);
    }

    if (error) {
      returnResponse(500, { error });
    }

    return returnResponse(204, "");
  }

  returnResponse(400, {
    error: `X-JM-App-Method header unrecognized. Expected one of 'watch', 'stop', or 'renew'`,
  });
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
      expiration: daysFromNowAsUnixTimestampInMiliseconds(1),
    },
  };

  let err, response;
  while (!err && !response) {
    try {
      response = await calendarClient.events.watch(params);
    } catch (error) {
      if (
        error.code == 400 &&
        error.errors.some(({ reason }) => reason == "channelIdNotUnique")
      ) {
        params.requestBody.id = uuidV4();
      } else {
        err = error;
      }
    }
  }

  if (err) {
    console.log(`Couldn't create notification channel for calendar ${id}`);
    return [err];
  }

  console.log(
    `Successfully created Google Calendar notification channel for calendar ${id}`
  );
  return [null, response.data];
}

async function stopNotificationChannel({
  _id: id,
  channelId,
  channelToken,
  resourceId,
}) {
  let err, response;
  try {
    response = await calendarClient.channels.stop({
      requestBody: {
        id: channelId,
        resourceId: resourceId,
        token: channelToken,
      },
    });
  } catch (error) {
    err = error;
  }

  if (err) {
    console.log(`Could not stop notification channel for calendar ${id}`);
    return [err];
  } else if (response.status !== 204) {
    console.log("Unexpected response. Expected 204");
    return [response];
  }

  console.log(
    `Successfully stopped Google Calendar notification channel for calendar ${id}`
  );
  return [null];
}

async function renewNotificationChannels() {
  let calendars;
  try {
    calendars = await sanityClient.fetch("*[_type==$type]", {
      type: "calendar",
    });
  } catch (error) {
    console.log("Couldn't fetch calendar documents");
    return [error];
  }

  if (!calendars || calendars.length < 1) {
    console.log("No calendars exist. Nothing to do.");
    return [null];
  }

  const tasks = calendars.map(async calendarDocument => {
    const { _id: id, channelExpiration } = calendarDocument;
    if (
      channelExpiration &&
      channelExpiration < daysFromNowAsUnixTimestampInMiliseconds(1)
    ) {
      let error;
      if (channelExpiration > new Date().getTime()) {
        [error] = await stopNotificationChannel(calendarDocument);
      }

      if (error) {
        return [error];
      }

      let data;
      [error, data] = await createNotificationChannel(calendarDocument);

      if (error) {
        [error] = await unsetCalendarDocumentFields(id);
        return [error];
      }

      [error] = await updateCalendarDocument(id, {
        resourceId: data.resourceId,
        channelId: data.id,
        channelExpiration: data.expiration,
        channelToken: data.token,
      });
      if (error) {
        return [error];
      }

      console.log(`Successfully renewed channel for calendar ${id}`);
      return [null];
    }

    console.log(`Skipping calendar ${id}: Renewal unnecessary.`);
    return [null];
  });

  try {
    await Promise.all(tasks);
  } catch (error) {
    return [error];
  }

  return [null];
}

async function updateCalendarDocument(id, data) {
  let err;
  try {
    await sanityClient.patch(id).set(data).commit();
  } catch (error) {
    err = error;
  }

  if (err) {
    console.log(`Couldn't patch calendar '${id}'`);
  } else {
    console.log(`Successfully patched calendar '${id}' in Sanity`);
  }

  return [err];
}

async function unsetCalendarDocumentFields(id) {
  let err;
  try {
    await sanityClient
      .patch(id)
      .unset([
        "resourceId",
        "channelId",
        "channelExpiration",
        "channelToken",
        "nextSyncToken",
      ])
      .commit();
  } catch (error) {
    err = error;
  }

  if (err) {
    console.log(`Couldn't patch calendar '${id}'`);
  } else {
    console.log(`Successfully patched calendar '${id}' in Sanity`);
  }

  return [err];
}

function setSanityClient() {
  sanityClient = sanity({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    token: SANITY_API_TOKEN,
    useCdn: false,
  });
}

function setGoogleCalendarClient() {
  let credentials;

  try {
    credentials = JSON.parse(GOOGLE_SERVICE_ACCT_KEY);
  } catch (error) {
    return returnResponse(500, { error: "Couldn't parse credentials" });
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
  });

  calendarClient = google.calendar({
    version: "v3",
    auth,
  });
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
