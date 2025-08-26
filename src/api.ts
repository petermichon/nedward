type Call = {
  method: string
  route: string
  body: string
}

function api(call: Call): Response {
  // console.log('method:', call.method)
  // console.log('route:', call.route)
  console.log('body:', call.body)

  type Data = {
    name: string
    files: {
      [key: string]: string
    }
  }
  // const data = {
  //   name: 'abc',
  //   files: {
  //     'index.html': 'Hello, World!',
  //   },
  // }
  // console.log(JSON.stringify(data))

  // POST DATA
  // curl -k -d "key1=value1" -d "key2=value2" https://localhost:port/endpoint

  // POST A FILE
  // curl -k -X POST -F "file=@/path/to/file.txt" https://localhost:port/upload

  // POST JSON
  /*
    curl -k -X POST -H "Content-Type: application/json" \
    -d '{"username":"admin","password":"1234"}' \
    https://localhost:port/api/login
  */

  // curl -k -X POST https://localhost:8443/add -d '{}'
  // '{"name":"abc","files":{"index.html":"Hello, World!"}}'
  // curl -k -X POST https://localhost:8443/write -d '{"name":"abc","files":{"index.html":"Hello, World!"}}'
  if (call.method === 'POST' && call.route === '/write') {
    const body = JSON.parse(call.body) as Data

    const name = body.name
    const files = Object.entries(body.files)

    // for (const [key, value] of Object.entries(body.files)) {
    //   console.log(key, value)
    // }

    console.log(name)

    // Deno.removeSync(`./public/${name}`, { recursive: true })

    try {
      Deno.mkdirSync(`./public/${name}`)
    } catch {}

    for (const [key, value] of files) {
      console.log(key, value)
      const content = new TextEncoder().encode(value)
      Deno.writeFileSync(`./public/${name}/${key}`, content)
    }

    return new Response('OK\n', { status: 200 })
  }

  return new Response('Not found\n', { status: 404 })
}

export { api }
