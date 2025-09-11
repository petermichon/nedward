const workspace = '~/nedward-workspace'

function main() {
  const certPath = `${workspace}/secret/fullchain.pem`
  const keyPath = `${workspace}/secret/privkey.pem`

  const cert = Deno.readTextFileSync(certPath)
  const key = Deno.readTextFileSync(keyPath)

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
  // console.log(method + ' ' + route + ' ' + body)

  // Read a file
  if (method === 'GET' && route === '/api/v1/files') {
    // curl -X GET https://localhost:8443/api/v1/files?path=./test.html

    const path = url.searchParams.get('path')
    // console.log(path)

    const key = `${workspace}/public/${path}`
    // console.log(key)

    let value = ''
    try {
      value = Deno.readTextFileSync(key)
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return new Response('File not found\n', { status: 404 })
      }
      throw error
    }
    // console.log(value)

    // const message = method + ' ' + route + ' ' + body + '\n'
    const message = value
    const response = new Response(message, { status: 200 })
    return response
  }

  // Write a file
  if (method === 'POST' && route === '/api/v1/files') {
    // curl -X POST https://localhost:8443/api/v1/files?path=./test.txt -d $'Hello, World!\n'

    const path = url.searchParams.get('path')
    console.log(path)

    const key = `${workspace}/public/${path}`
    console.log(key)

    Deno.writeTextFileSync(key, body)

    // const message = method + ' ' + route + ' ' + body + '\n'
    const message = 'OK\n'
    const response = new Response(message, { status: 200 })
    return response
  }

  if (method === 'DELETE' && route === '/api/v1/files') {
    // curl -X DELETE https://localhost:8443/api/v1/files?path=./test.txt

    const path = url.searchParams.get('path')
    console.log(path)

    const key = `${workspace}/public/${path}`
    console.log(key)

    try {
      Deno.removeSync(key, { recursive: false })
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        return new Response('File not found\n', { status: 404 })
      }
      throw error
    }

    // const message = method + ' ' + route + ' ' + body + '\n'
    const message = 'OK\n'
    const response = new Response(message, { status: 200 })
    return response
  }

  // curl -X POST https://localhost:8443/api/v1/files -d '{"container":"example","files":{"index.html":"Hello, World!"}}'

  const message = 'Not found\n'
  const response = new Response(message, { status: 404 })
  return response
}

export { main }
