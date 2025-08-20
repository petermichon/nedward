import { serveDir } from 'https://deno.land/std@0.224.0/http/file_server.ts'

async function handle(req: Request): Promise<Response> {
  const url = req.url

  const host = url.split('/')[2]

  // when no subdomain is set, this is equal to the main domain
  const subdomain = host.split('.')[0]

  const root = './public/' + subdomain
  const response = await serveDir(req, { fsRoot: root })

  return response
}

export { handle }
