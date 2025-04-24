import { pathToFileURL } from 'node:url';

function handle(event, context, callback) {
  const name = event.queryStringParameters.name;
  const msg = `Hello, ${name}!`;
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: msg,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

// This will execute when testing locally, but not when the function is launched
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  import('@scaleway/serverless-functions').then((scw_fnc_node) => {
    scw_fnc_node.serveHandler(handle, 8080);
  });
}
