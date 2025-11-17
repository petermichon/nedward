import { deleteFile } from './routes/deleteFile.ts'
import { listFiles } from './routes/listFiles.ts'
import { readFile } from './routes/readFile.ts'
import { writeFile } from './routes/writeFile.ts'

const Status = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
  BadRequest: 400,
  NotFound: 404,
  InternalServerError: 500,
}

const cors: HeadersInit = {
  'Access-Control-Allow-Origin': '*',
}

// Also needs to be changed in deno.json
const workspace = './workspace'

async function handle(req: Request): Promise<Response> {
  const url = new URL(req.url)

  const method = req.method
  const route = url.pathname

  // const origin = req.headers.get('origin') ?? '*'

  if (method === 'OPTIONS') {
    const origin = req.headers.get('origin') ?? '*'
    const corsHeaders = new Headers({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type,Authorization,X-Requested-With',
      'Access-Control-Max-Age': '86400',
    })

    const message = 'OK\n'
    const response = new Response(message, {
      status: Status.Ok,
      headers: corsHeaders,
    })

    return response
  }

  if (method === 'GET' && route === '/api/v1/files') {
    // curl -X GET https://localhost:8443/api/v1/files

    const params = {
      path: url.searchParams.get('path') || '',
    }

    const path = `${workspace}/${params.path}`

    const result = listFiles(path)
    if (result.error) {
      // ...
      return new Response('Internal Server Error\n', {
        status: Status.InternalServerError,
        headers: cors,
      })
    }
    const files = result.value

    const response = new Response(files, {
      status: Status.Ok,
      headers: cors,
    })

    return response
  }

  if (method === 'GET' && route === '/api/v1/files/content') {
    // curl -X GET https://localhost:8443/api/v1/files/content?path=./test.html

    const params = {
      path: url.searchParams.get('path')!,
    }

    if (!params.path) {
      return new Response('Bad Request\n', {
        status: Status.BadRequest,
        headers: cors,
      })
    }

    const path = `${workspace}${params.path}`

    const result = readFile(path)

    if (result.error) {
      console.log(result.error)

      if (result.error instanceof Deno.errors.NotADirectory) {
        return new Response('Bad Request\n', {
          status: Status.BadRequest,
          headers: cors,
        })
      }
      if (result.error instanceof Deno.errors.NotFound) {
        return new Response('Not Found\n', {
          status: Status.NotFound,
          headers: cors,
        })
      }
      // else
      return new Response('Internal Server Error\n', {
        status: Status.InternalServerError,
        headers: cors,
      })
    }

    const body = result.value

    const headers: HeadersInit = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'image/jpeg',
      // 'Content-Disposition': 'inline', // default (i think?)
    }
    const response = new Response(body, {
      status: Status.Ok,
      headers: headers,
    })
    return response
  }

  if (method === 'POST' && route === '/api/v1/files/content') {
    // curl -X POST https://localhost:8443/api/v1/files?path=./test.txt -d $'Hello, World!\n'

    // from a file : ./videos.json
    // curl -X POST -H "Content-Type: application/json" --data-binary @videos.json "https://narval.petermichon.fr/api/v1/files?path=./narval/videos.json"

    const params = {
      path: url.searchParams.get('path')!,
    }

    if (!params.path) {
      return new Response('Bad Request\n', {
        status: Status.BadRequest,
        headers: cors,
      })
    }

    const path = `${workspace}${params.path}`

    const data = await req.bytes()

    const error = writeFile(path, data)
    if (error) {
      // ...
      return new Response('Internal Server Error\n', {
        status: Status.InternalServerError,
        headers: cors,
      })
    }

    const message = 'OK\n'
    const response = new Response(message, {
      status: Status.Ok,
      headers: cors,
    })
    return response
  }

  if (method === 'DELETE' && route === '/api/v1/files') {
    // curl -X DELETE https://localhost:8443/api/v1/files?path=./test.txt

    const params = {
      path: url.searchParams.get('path') || '',
    }

    const path = `${workspace}${params.path}`

    const error = deleteFile(path)

    if (error) {
      if (error instanceof Deno.errors.NotFound) {
        return new Response('Not Found\n', {
          status: Status.NotFound,
          headers: cors,
        })
      }
      return new Response('Internal Server Error\n', {
        status: Status.InternalServerError,
        headers: cors,
      })
    }

    const message = 'OK\n'
    const response = new Response(message, {
      status: Status.Ok,
      headers: cors,
    })
    return response
  }

  if (method === 'GET') {
    const host = url.hostname

    const firstDomain = host.split('.')[0]

    const path = `${workspace}${firstDomain}/index.html`

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

  // else
  const message = 'Not Found\n'
  const response = new Response(message, {
    status: Status.NotFound,
    headers: cors,
  })

  return response
}

export { handle }
