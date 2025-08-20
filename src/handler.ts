import { serveDir } from 'https://deno.land/std@0.224.0/http/file_server.ts'

async function handle(req: Request): Promise<Response> {
  const url = new URL(req.url)

  const host = url.hostname

  if (url.pathname.startsWith('/.well-known/')) {
    return serveDir(req, {
      // fsRoot: '.',
      // urlRoot: '',
      fsRoot: '.well-known',
      urlRoot: '.well-known', // note: use this for url based websites
      // showIndex: false,
      // enableCors: true,
    })
  }

  // when no subdomain is set, this is equal to the root domain
  const subdomain = host.split('.')[0]

  const root = './public/' + subdomain
  const response = await serveDir(req, { fsRoot: root })

  return response
}

export { handle }
