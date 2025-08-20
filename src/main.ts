import { handle } from './handler.ts'

function main() {
  // HTTP
  Deno.serve({
    port: 8080,
    handler: handle,
  })

  // HTTPS
  const certPath = './secret/fullchain.pem'
  const keyPath = './secret/privkey.pem'

  const cert = Deno.readTextFileSync(certPath)
  const key = Deno.readTextFileSync(keyPath)

  Deno.serve({
    port: 8443,
    cert: cert,
    key: key,
    handler: handle,
  })
}

// note: remember to not redirect /.well-known/* to https
function redirect(req: Request): Response {
  // Redirect HTTP to HTTPS
  const url = new URL(req.url)
  url.protocol = 'https:'
  url.port = '443'
  return Response.redirect(url.toString(), 301)
}

export { main }
