const { google } = require("googleapis");
const { v5: uuidV5 } = require("uuid");

const { returnResponse } = require("./utils/request-config");

const {
  GOOGLE_SERVICE_ACCT_KEY,
  SANITY_API_TOKEN,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
} = process.env;

module.exports.handler = event => {
  if (event.httpMethod !== "POST" || !event.body) {
    return returnResponse(400, "");
  }

  let data;
  let credentials;

  try {
    data = JSON.parse(event.body);
    credentials = JSON.parse(GOOGLE_SERVICE_ACCT_KEY);
  } catch (error) {
    console.error(error);
    return returnResponse(400, { error: "Couldn't parse request body" });
  }

  console.log(data);

  // const { calendarId } = data;

  // const auth = new google.auth.GoogleAuth({
  //   credentials,
  //   scopes: ["https://www.googleapis.com/auth/calendar.events.readonly"],
  // });

  // const calendar = google.calendar({
  //   version: "v3",
  //   auth,
  // });

  // const address = "https://johnnymoses.netlify.app/.netlify/functions/google-calendar/events-sync/";
  // const NAMESPACE = uuidV5("https://johnnymoses.netlify.app", uuidV5.URL);
  // const id = uuidV5(calendarId, NAMESPACE);

  // const response = await calendar.events.watch({
  //   calendarId,
  //   requestBody: {
  //     id,
  //     address,
  //     type: "web_hook",
  //     token: process.env.APP_TOKEN,
  //   },
  // });
};
