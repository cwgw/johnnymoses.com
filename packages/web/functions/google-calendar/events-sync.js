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
  console.log(JSON.stringify(event));
  return statusReturn(200, "");
};
