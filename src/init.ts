import { SSL_CERT, SSL_KEY } from './secret/ssl.ts'

export function init() {
  Deno.env.set('SSL_CERT', SSL_CERT)
  Deno.env.set('SSL_KEY', SSL_KEY)
}
