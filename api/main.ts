import { handle } from './handler.ts'

function main() {
  const cert = Deno.env.get('SSL_CERT')
  const key = Deno.env.get('SSL_KEY')

  Deno.serve({
    port: 8443,
    cert: cert,
    key: key,
    handler: handle,
  })

  // const kv = await Deno.openKv()
  // const kv = Deno.openKv()
  // --unstable-kv
}

export { main }
