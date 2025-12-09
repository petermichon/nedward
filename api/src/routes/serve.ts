import { readFile } from '../core/readFile.ts'

function serveFile(req: Request): Response {
  const url = new URL(req.url)

  const Status = {
    Ok: 200,
    InternalServerError: 500,
  }

  const cors: HeadersInit = {
    'Access-Control-Allow-Origin': '*',
  }

  // Also needs to be changed in deno.json
  const workspace = './workspace'

  const host = url.hostname

  const firstDomain = host.split('.')[0]

  const path = `${workspace}/${firstDomain}/index.html`

  // const result = serveFile(path, req)
  const result = readFile(path)

  if (result.error) {
    // ---
    // if file not found, fallback to index.html for SPA routing
    // if (response.status === Status.NotFound) {
    //   try {
    //     const indexContent = await Deno.readFile(`${path}/index.html`)
    //     response = new Response(indexContent, {
    //       status: Status.Ok,
    //       headers: {
    //         ...cors,
    //         'content-type': 'text/html',
    //       },
    //     })
    //   } catch {
    //     // if index.html is missing, fallback to original NotFound response
    //   }
    // }
    // ---
    return new Response('Internal Server Error\n', {
      status: Status.InternalServerError,
      headers: cors,
    })
  }
  const body = result.value

  const response = new Response(body, {
    status: Status.Ok,
    headers: {
      ...cors,
      'content-type': 'text/html',
    },
  })

  return response
}

export { serveFile }
