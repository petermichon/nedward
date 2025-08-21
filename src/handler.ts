import { serveDir } from 'https://deno.land/std@0.224.0/http/file_server.ts'

async function handle(req: Request): Promise<Response> {
  const url = new URL(req.url)

  const host = url.hostname
  const subdomain = host.split('.')[0]

  const root = './public/'
  const path = root + subdomain

  // Try to serve static file first
  let response = await serveDir(req, { fsRoot: path })

  // If file not found, fallback to index.html for SPA routing
  if (response.status === 404) {
    try {
      const indexContent = await Deno.readFile(`${path}/index.html`)
      response = new Response(indexContent, {
        status: 200,
        headers: { 'content-type': 'text/html' },
      })
    } catch {
      // If index.html is missing, fallback to original 404 response
    }
  }

  return response
}

async function handle1(req: Request): Promise<Response> {
  const url = new URL(req.url)

  const host = url.hostname

  // when no subdomain is set, this is equal to the root domain
  const subdomain = host.split('.')[0]

  const root = './public/'
  const path = root + subdomain

  const response = await serveDir(req, { fsRoot: path })

  return response
}

async function handle2(req: Request): Promise<Response> {
  // console.log(req)

  const url = new URL(req.url)

  const path = url.pathname
  // console.log('path:', path)

  const root = './public' + path
  // console.log('root:', root)

  const host = path.split('/')[1]
  // console.log('host:', host)

  const referer = req.headers.get('referer') || ''
  console.log('referrer:', referer)

  // get only referer path
  const refererPath = referer.split('/')[3] || ''
  console.log('refererPath:', refererPath)

  const response = await serveDir(req, {
    fsRoot: './public/narval/', // + refererPath
    urlRoot: '',
  })

  return response
}

export { handle }
