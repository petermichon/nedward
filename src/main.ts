import { handler } from './handler.ts'

function main() {
  const certPath = './secret/fullchain.pem'
  const keyPath = './secret/privkey.pem'

  const cert = Deno.readTextFileSync(certPath)
  const key = Deno.readTextFileSync(keyPath)

  const options = { port: 8443, cert: cert, key: key }

  // Deno.serve(options, handler)
  Deno.serve({ hostname: '0.0.0.0', port: 8443, handler })
}

export { main }
