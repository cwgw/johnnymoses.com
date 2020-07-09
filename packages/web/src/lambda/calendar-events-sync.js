const { returnResponse } = require("./utils/request-config");

module.exports.handler = event => {
  console.log(JSON.stringify(event));
  return returnResponse(200, "");
};
