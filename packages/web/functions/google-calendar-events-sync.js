require("dotenv").config();
const sanityClient = require("@sanity/client");

const { SANITY_API_TOKEN, SANITY_PROJECT_ID, SANITY_DATASET } = process.env;

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

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  useCdn: false,
});

module.exports.handler = async event => {
  if (event.httpMethod !== "POST" || !event.body) {
    return statusReturn(400, "");
  }

  let data;

  try {
    data = JSON.parse(event.body);
    console.log(data);
    // do validation here
  } catch (error) {
    console.error("JSON parsing error:", error);
    return statusReturn(400, { error: "Bad request body" });
  }

  const eventDocument = {
    _type: "event",
    _id: data.id.toString(),
  };

  const eventDocumentData = {
    "content.main.title": data.summary,
    "content.main.start": data.start.dateTime,
    "content.main.end": data.end.dateTime,
    "content.main.location": data.location,
    "content.main.description": data.description,
  };

  return client
    .transaction()
    .createIfNotExists(eventDocument)
    .patch(data.id.toString(), patch => patch.set(eventDocumentData))
    .commit()
    .then(() => {
      console.log(`Successfully updated/patched Product ${data.id} in Sanity`);
    })
    .catch(error => {
      console.error("Sanity error:", error);
      return statusReturn(500, {
        error: "An internal server error has occurred",
      });
    });
};
