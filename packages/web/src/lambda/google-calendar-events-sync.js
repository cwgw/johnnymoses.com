const querystring = require("querystring");
const sanityClient = require("@sanity/client");

const { returnResponse } = require("./utils/request-config");

const { SANITY_API_TOKEN, SANITY_PROJECT_ID, SANITY_DATASET } = process.env;

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  useCdn: false,
});

module.exports.handler = async event => {
  console.log(event);
  console.log(JSON.stringify(event));

  if (event.httpMethod !== "POST" || !event.body) {
    return returnResponse(400, "");
  }

  let data;
  let id;

  try {
    data = JSON.parse(event.body);
    id = decodeGoogleEvendId(data.htmlLink);
    if (!id) {
      return returnResponse(400, { error: "Bad request body" });
    }
  } catch (error) {
    console.error("JSON parsing error:", error);
    return returnResponse(400, { error: "Bad request body" });
  }

  const eventDocument = {
    _type: "event",
    _id: id,
  };

  const eventDocumentData = {
    "content.main.title": data.summary,
    "content.main.start": data.start.dateTime,
    "content.main.end": data.end.dateTime,
    "content.main.location": data.location,
    "content.main.description": data.description,
    "content.main.uid": `${id}@google.com`,
    "content.main.created": data.created,
    "content.main.updated": data.updated,
    "content.main.htmlLink": data.htmlLink,
  };

  return client
    .transaction()
    .createIfNotExists(eventDocument)
    .patch(id, patch => patch.set(eventDocumentData))
    .commit()
    .then(() => {
      console.log(`Successfully updated/patched Event '${id}' in Sanity`);
    })
    .catch(error => {
      console.error("Sanity error:", error);
      return returnResponse(500, {
        error: "An internal server error has occurred",
      });
    });
};

function decodeGoogleEvendId(url) {
  const { hostname, searchParams } = new URL(url);

  if (!/^(www\.)?google\.com$/.test(hostname) || !searchParams.has("eid")) {
    console.warn(`Couldn't get event ID from '${url}'`);
    return;
  }

  try {
    const decodedId = Buffer.from(searchParams.get("eid"), "base64").toString(
      "utf8"
    );
    return decodedId.split(" ").shift();
  } catch (error) {
    console.warn(error);
    return;
  }
}
