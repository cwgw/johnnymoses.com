const { google } = require("googleapis");
const { v5: uuidV5 } = require("uuid");
const sanityClient = require("@sanity/client");

const { encode, returnResponse } = require("./utils/request-config");

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

const hoursFromNowAsUnixTimestampInMiliseconds = (n = 1) => {
  let now = new Date();
  let then = new Date();
  then.setTime(now.getTime() + n * 60 * 60 * 1000);
  // return Math.floor(then.getTime() / 1000);
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

  // validate token
  const appToken = event.headers["x-app-token"];
  if (!appToken || appToken !== APP_TOKEN) {
    returnResponse(400, { error: `Invalid app token` });
  }

  let calendarDocument;
  try {
    calendarDocument = JSON.parse(event.body);
  } catch (error) {
    console.error(error);
    return returnResponse(400, { error: "Couldn't parse request body" });
  }

  let credentials;
  try {
    credentials = JSON.parse(GOOGLE_SERVICE_ACCT_KEY);
  } catch (error) {
    console.error(error);
    return returnResponse(400, { error: "Couldn't parse credentials" });
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
  });

  const calendar = google.calendar({
    version: "v3",
    auth,
  });

  const { calendarId, _id: documentId } = calendarDocument;
  const address =
    "https://johnnymoses.netlify.app/.netlify/functions/calendar-events-sync/";
  const NAMESPACE = uuidV5("https://johnnymoses.netlify.app", uuidV5.URL);
  const id = uuidV5(calendarId, NAMESPACE);
  const token = encode(calendarId, documentId, APP_TOKEN);
  const expiration = hoursFromNowAsUnixTimestampInMiliseconds(0.5);

  const response = await calendar.events.watch({
    calendarId,
    requestBody: {
      id,
      address,
      type: "web_hook",
      token,
      expiration,
    },
  });

  if (response.status !== 200) {
    console.error("Could not create Google Calendar notification channel");
    return response;
  }

  console.log(`Successfully created Google Calendar notification channel`);
  client
    .patch(documentId)
    .set({
      resourceId: response.data.resourceId,
      channelId: response.data.id,
      channelExpiration: response.data.expiration,
      channelToken: response.data.token,
    })
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
};
