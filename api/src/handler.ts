import { deleteFile } from './routes/removeFileDir.ts'
import { getFolder } from './routes/getFolder.ts'
import { getFile } from './routes/getFile.ts'
import { postFile } from './routes/postFile.ts'
import { postFolder } from './routes/postFolder.ts'
import { serveFile } from './routes/serve.ts'

function handle(req: Request): Response {
  const url = new URL(req.url)

  const method = req.method
  const route = url.pathname

  // const origin = req.headers.get('origin') ?? '*'

  if (method === 'OPTIONS') {
    const Status = {
      Ok: 200,
    }
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

  if (method === 'DELETE' && route === '/api/v1/files') {
    // curl -X DELETE https://localhost:8443/api/v1/files?path=./test.txt
    return deleteFile(req)
  }

  if (method === 'GET' && route === '/api/v1/files') {
    // curl -X GET https://localhost:8443/api/v1/files
    return getFolder(req)
  }

  if (method === 'GET' && route === '/api/v1/files/content') {
    // curl -X GET https://localhost:8443/api/v1/files/content?path=/test.txt
    return getFile(req)
  }

  if (method === 'POST' && route === '/api/v1/files/content') {
    // curl -X POST https://localhost:8443/api/v1/files?path=./test.txt -d $'Hello, World!\n'
    // from a file : ./videos.json
    // curl -X POST -H "Content-Type: application/json" --data-binary @videos.json "https://narval.petermichon.fr/api/v1/files?path=./narval/videos.json"
    return postFile(req)
  }

  if (method === 'POST' && route === '/api/v1/folder') {
    // ...
    return postFolder(req)
  }

  // ---

  if (method === 'GET') {
    return serveFile(req)
  }

  // ---

  // else
  {
    const Status = {
      NotFound: 404,
    }

    const message = 'Not Found\n'
    const response = new Response(message, {
      status: Status.NotFound,
      headers: { 'Access-Control-Allow-Origin': '*' },
    })

    return response
  }
}

export { handle }
