const core = require('@actions/core');
const fetch = require('node-fetch');

main();


async function main() {
  const [error, output] = await makeRequest();

  if (error) {
    core.setFailed(error);
  }

  core.setOutput('output', output);
}


async function makeRequest() {
  const url = core.getInput('url');
  const method = core.getInput('method');
  
  let body;
  try {
    const bodyInput = core.getInput('body');
    body = bodyInput ? JSON.parse(bodyInput) : null;
  } catch (error) {
    return [error];
  }

  let headers;
  try {
    const headersInput = core.getInput('headers');
    headers = headersInput ? JSON.parse(headersInput) : null;
  } catch (error) {
    return [error];
  }

  const params = { method, body, headers }

  let response;
  try {
    response = await fetch(url, params);
  } catch (error) {
    return [error];
  }

  if (response.status >= 400) {
    return [
      {
        message: `HTTP request failed with status code: ${status}`,
        response
      }
    ];
  }

  let output = {
    request: {
      url,
      ...params
    },
    response,
  };

  try {
    output = JSON.stringify(output);
  } catch (error) {
    return [error];
  }

  return [null, output];
}
