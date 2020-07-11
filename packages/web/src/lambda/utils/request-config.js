const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const returnResponse = (code, body, _headers) => {
  return {
    statusCode: code,
    headers: _headers || headers,
    body: JSON.stringify(body),
  };
};

const returnError = message => error => {
  console.error(`${message}\n`, error);
  return returnResponse(500, { error: "An internal server error has occurred" });
}

const base64Encode = str => Buffer.from(str, "utf-8").toString("base64");
const base64Decode = str => Buffer.from(str, "base64").toString("utf-8");

const encode = (...args) => base64Encode(args.join(" "));
const decode = str => base64Decode(str).split(" ");

export { returnResponse, returnError, encode, decode };
