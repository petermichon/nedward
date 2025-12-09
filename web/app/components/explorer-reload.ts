import { newFileComponent } from './explorer-file.ts'
import { newReloadButtonComponent } from './reloadbutton.ts'

function newExplorerReloadComponent(filesList: HTMLElement): HTMLElement {
  const e = newReloadButtonComponent()

  e.addEventListener('click', () => {
    const params = {
      path: new URLSearchParams(globalThis.location.search).get('path')!,
    }

    const path = params.path

    const promise = fetchFiles(path)
    promise.then((res) => {
      res.text().then((text) => {
        const files = JSON.parse(text)

        // Clear old files
        filesList.innerHTML = ''

        type File = {
          name: string
          isFile: boolean
          isDirectory: boolean
          isSymlink: boolean
        }

        // Sort files
        files.sort((a: File, b: File) => {
          // 1: Compare the `isDirectory` flag (true → false)
          if (a.isDirectory !== b.isDirectory) {
            return a.isDirectory ? -1 : 1 // true comes before false
          }
          // 2: If both are same type, compare names case‑insensitively
          return a.name.localeCompare(b.name, undefined, {
            sensitivity: 'base',
          })
        })

        for (const file of files) {
          const e = newFileComponent(file, path)
          filesList.appendChild(e)
        }
      })
    })
  })

  return e
}

const env = {
  domain: 'localhost:8443',
}

async function fetchFiles(path: string): Promise<Response> {
  const domain = env.domain
  const url = `https://${domain}/api/v1/files?path=${path}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/plain', // ?
      // 'Content-Type': 'application/octet-stream',
    },
  })

  return response
}

export { newExplorerReloadComponent }
