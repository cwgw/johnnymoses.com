const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const returnResponse = (code, body) => {
  return {
    statusCode: code,
    headers,
    body: JSON.stringify(body),
  };
};

export { returnResponse };
