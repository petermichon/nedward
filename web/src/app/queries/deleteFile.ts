const env = {
  domain: 'localhost:8443',
}

async function fetchDeleteFiles(fileName: string): Promise<Response> {
  const params = {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  }
  const domain = env.domain
  const path = params.path + fileName

  const url = `https://${domain}/api/v1/files?path=${path}`

  console.log(url)

  const response = await fetch(url, {
    method: 'DELETE',
    // headers: {
    // 'Content-Type': 'text/plain',
    // 'Content-Type': 'application/octet-stream',
    // },
  })

  return response
}

export { fetchDeleteFiles }
