import { newReloadButtonComponent } from './reloadbutton.ts'

function newEditorReloadComponent(fileEditor: HTMLElement) {
  const e = newReloadButtonComponent()
  e.addEventListener('click', () => {
    const promise = fetchGetFilesContent()
    promise.then((res) => {
      res.text().then((text) => {
        fileEditor.textContent = text
      })
    })
  })

  return e
}

async function fetchGetFilesContent(): Promise<Response> {
  const params = {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  }
  const domain = 'localhost:8443'
  const path = params.path

  const url = `https://${domain}/api/v1/files/content?path=${path}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain',
      // 'Content-Type': 'application/octet-stream',
    },
  })

  return response
}

export { newEditorReloadComponent }
