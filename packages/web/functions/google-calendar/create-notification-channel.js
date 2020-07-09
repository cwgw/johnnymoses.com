const { google } = require("googleapis");
const { v5: uuidV5 } = require("uuid");

const {
  GOOGLE_SERVICE_ACCT_KEY,
  SANITY_API_TOKEN,
  SANITY_PROJECT_ID,
  SANITY_DATASET,
} = process.env;

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const statusReturn = (code, body) => {
  return {
    statusCode: code,
    headers,
    body: JSON.stringify(body),
  };
};

module.exports.handler = event => {
  if (event.httpMethod !== "POST" || !event.body) {
    return statusReturn(400, "");
  }

  let data;
  let credentials;

  try {
    data = JSON.parse(event.body);
    credentials = JSON.parse(GOOGLE_SERVICE_ACCT_KEY);
  } catch (error) {
    console.error(error);
    return statusReturn(400, { error: "Couldn't parse request body" });
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
