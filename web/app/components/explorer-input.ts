const env = {
  domain: 'localhost:8443',
}

function newExplorerInputComponent(): HTMLElement {
  const eInput = document.createElement('input')
  eInput.type = 'file'
  // eInput.webkitdirectory = true
  eInput.multiple = true

  eInput.className = 'hidden'

  eInput.addEventListener('change', () => {
    if (eInput.files) {
      // handleFiles(e1.files)
      const fileList = eInput.files

      const params = {
        path: new URLSearchParams(globalThis.location.search).get('path') || '',
      }
      const domain = env.domain
      // const path = params.path

      Array.from(fileList).forEach((file) => {
        file.arrayBuffer().then((body) => {
          const path = `${params.path}${file.name}`
          const url = `https://${domain}/api/v1/files/content?path=${path}`

          const res = fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/octet-stream',
            },
            body: body,
          })
          res.then(() => {
            // add the new file to the list just as a visual feedback
            // note : this won't work in single-page. -> page reload
            // const node = newFileComponent(
            //   {
            //     name: file.name,
            //     isFile: true,
            //     isDirectory: false,
            //     isSymlink: false,
            //   },
            //   params.path
            // )
            // e.appendChild(node)
          })
        })
      })
    }
  })

  return eInput
}

export { newExplorerInputComponent }
