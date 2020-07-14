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
  
  let body = core.getInput('body');

  let headers;
  try {
    const input = core.getInput('headers')
    headers = input ? JSON.parse(input) : null;
  } catch (error) {
    return [error];
  }

  if (headers['content-type'] === 'application/json') {
    try {
      JSON.parse(bodyInput);
    } catch (error) {
      console.warn(
        "Content-Type header is specified as 'application/json' but body is not a valid json string"
      );
    }
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

  console.log({ output });

  try {
    output = JSON.stringify(output);
  } catch (error) {
    return [error];
  }

  return [null, output];
}
