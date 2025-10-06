import { serveDir } from '@std/http/file-server'

const Status = {
  Ok: 200,
  Created: 201,
  NoContent: 204,
}

// Also needs to be changed in deno.json
const workspace = './workspace'

function main() {
  // const certPath = `${workspace}/secret/fullchain.pem`
  // const keyPath = `${workspace}/secret/privkey.pem`

  // const cert = Deno.readTextFileSync(certPath)
  // const key = Deno.readTextFileSync(keyPath)

  const cert = Deno.env.get('SSL_CERT')
  const key = Deno.env.get('SSL_KEY')

  // console.log('cert:', cert)
  // console.log('key:', key)

  Deno.serve({
    port: 8443,
    cert: cert,
    key: key,
    handler: handle,
  })
}

async function handle(req: Request): Promise<Response> {
  const url = new URL(req.url)

  const method = req.method
  const route = url.pathname
  const body = await req.text()

  // const origin = req.headers.get('origin') ?? '*'
  // console.log(origin)

  const cors: HeadersInit = {
    'Access-Control-Allow-Origin': '*',
  }

  if (method === 'OPTIONS') {
    const origin = req.headers.get('origin') ?? '*'
    const corsHeaders = new Headers({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type,Authorization,X-Requested-With',
      'Access-Control-Max-Age': '86400',
    })
    // ---
    const message = 'OK\n'
    const response = new Response(message, {
      status: Status.Ok,
      headers: corsHeaders,
    })
    return response
  }

  if (method === 'GET' && route === '/api/v1/files') {
    // curl -X GET https://localhost:8443/api/v1/files

    const param = {
      path: url.searchParams.get('path') || '',
    }

    const path = `${workspace}/${param.path}`
    // console.log(path)
    const files = Deno.readDirSync(path)

    const allFiles: { name: string; isFile: boolean }[] = []

    files.forEach((file) => {
      allFiles.push({
        name: file.name,
        isFile: file.isFile,
      })
    })

    const message = JSON.stringify(allFiles)
    const response = new Response(message, {
      status: Status.Ok,
      headers: cors,
    })
    return response
  }

  // Read a file
  if (method === 'GET' && route === '/api/v1/files/content') {
    // curl -X GET https://localhost:8443/api/v1/files/content?path=./test.html

    const path = url.searchParams.get('path')
    // console.log(path)

    if (!path) {
      return new Response('No path provided\n', {
        status: 400,
        headers: cors,
      })
    }

    const key = `${workspace}/${path}`
    // console.log(key)

    let value = ''
    try {
      value = Deno.readTextFileSync(key)
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return new Response('File not found\n', {
          status: 404,
          headers: cors,
        })
      }
      if (error instanceof Deno.errors.IsADirectory) {
        return new Response('Path is a directory\n', {
          status: 400,
          headers: cors,
        })
      }
      throw error
    }
    // console.log(value)

    // const message = method + ' ' + route + ' ' + body + '\n'
    const message = value
    const response = new Response(message, {
      status: 200,
      headers: cors,
    })
    return response
  }

  // Write a file
  if (method === 'POST' && route === '/api/v1/files/content') {
    // curl -X POST https://localhost:8443/api/v1/files?path=./test.txt -d $'Hello, World!\n'

    // from a file : ./videos.json
    // curl -X POST -H "Content-Type: application/json" --data-binary @videos.json "https://narval.petermichon.fr/api/v1/files?path=./narval/videos.json"

    const param = {
      path: url.searchParams.get('path') || '',
    }

    // console.log(path)

    if (!param.path) {
      return new Response('No path provided\n', {
        status: 400,
        headers: cors,
      })
    }

    const path = `${workspace}/${param.path}`
    // console.log(key)

    const data = body
    Deno.writeTextFileSync(path, data)

    // const message = method + ' ' + route + ' ' + body + '\n'
    const message = 'OK\n'
    const response = new Response(message, {
      status: 200,
      headers: cors,
    })
    return response
  }

  if (method === 'DELETE' && route === '/api/v1/files') {
    // curl -X DELETE https://localhost:8443/api/v1/files?path=./test.txt

    const path = url.searchParams.get('path')
    // console.log(path)

    const key = `${workspace}/${path}`
    // console.log(key)

    try {
      Deno.removeSync(key, { recursive: false })
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return new Response('File not found\n', {
          status: 404,
          headers: cors,
        })
      }
      throw error
    }

    // const message = method + ' ' + route + ' ' + body + '\n'
    const message = 'OK\n'
    const response = new Response(message, {
      status: 200,
      headers: cors,
    })
    return response
  }

  // serve files
  if (method === 'GET') {
    const host = url.hostname
    const firstDomain = host.split('.')[0]

    const root = './workspace/'
    const path = root + firstDomain

    // console.log(host)

    // Try to serve static file first
    let response = await serveDir(req, { fsRoot: path })

    // If file not found, fallback to index.html for SPA routing
    if (response.status === 404) {
      try {
        const indexContent = await Deno.readFile(`${path}/index.html`)
        response = new Response(indexContent, {
          status: 200,
          headers: {
            ...cors,
            'content-type': 'text/html',
          },
        })
      } catch {
        // If index.html is missing, fallback to original 404 response
      }
    }

    return response
  }

  const message = 'Not Found\n'
  const response = new Response(message, {
    status: 404,
    headers: cors,
  })

  return response
}

export { main }
