import { fetchDeleteFiles } from '../queries/deleteFile.ts'

import { Router } from '../router.ts'

type File = {
  name: string
  isFile: boolean
  isDirectory: boolean
  isSymlink: boolean
}

function newFileComponent(file: File, path: string): HTMLElement {
  let page = ''

  if (file.isFile) {
    // quite unsafe
    const extension = file.name.split('.')[1]

    page = 'editor'

    if (extension == 'jpg') {
      page = 'viewer'
    }
  }

  if (file.isDirectory) {
    page = 'files'
  }

  let fullpath = `${path}${file.name}`
  if (!file.isFile) {
    fullpath += '/'
  }

  const href = `/${page}/?path=${fullpath}`

  const e = document.createElement('a')
  e.href = href
  e.className =
    'flex items-center px-3 py-2 gap-3 rounded-xl cursor-pointer bg-white hover:bg-neutral-100 active:bg-neutral-200'
  // h-13
  // grid-rows-[auto_1fr_auto] overflow-y-auto
  e.addEventListener('click', (event) => {
    event.preventDefault()
    history.pushState({}, '', href)
    Router.navigate(`/${page}/`)
  })

  {
    let svgPath = ''
    if (file.isFile) {
      svgPath =
        'M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3'
    }
    if (file.isDirectory) {
      svgPath =
        'M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z'
    }

    const eSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    eSvg.classList.add('h-6.5', 'w-6.5')
    eSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    eSvg.setAttribute('fill', 'none')
    eSvg.setAttribute('viewBox', '0 0 24 24')
    eSvg.setAttribute('stroke', 'currentColor')
    {
      const ePath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      ePath.classList.add('items-center', 'p-3')
      ePath.setAttribute('stroke-linecap', 'round')
      ePath.setAttribute('stroke-linejoin', 'round')
      ePath.setAttribute('stroke-width', '1.25')
      ePath.setAttribute('d', svgPath)
      eSvg.appendChild(ePath)
    }
    e.appendChild(eSvg)
  }

  {
    const e1 = document.createElement('div')
    e1.className = 'px-1 py-1.75 truncate text-lg font-medium'
    // e1.textContent = `${file.isFile ? '📄' : '📁'} ${file.name}`
    e1.textContent = file.name
    e.appendChild(e1)
  }

  {
    const actions = document.createElement('div')
    actions.className = 'flex-grow flex justify-end space-x-2' // hidden group-hover:flex
    //
    {
      const a = newExplorerFileDeleteComponent(file.name)
      actions.appendChild(a)
    }

    e.appendChild(actions)
  }

  return e
}

function newExplorerFileDeleteComponent(fileName: string): HTMLElement {
  const e = newExplorerFileButtonComponent(fileName)
  {
    const e1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    e1.classList.add('h-4.5', 'w-4.5')
    e1.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    e1.setAttribute('fill', 'none')
    e1.setAttribute('viewBox', '0 0 24 24')
    e1.setAttribute('stroke', 'currentColor')
    {
      const e1a = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      e1a.classList.add('items-center', 'p-3')
      e1a.setAttribute('stroke-linecap', 'round')
      e1a.setAttribute('stroke-linejoin', 'round')
      e1a.setAttribute('stroke-width', '2')
      e1a.setAttribute(
        'd',
        'M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16'
      )
      e1.appendChild(e1a)
    }
    e.appendChild(e1)
  }

  return e
}

function newExplorerFileButtonComponent(fileName: string): HTMLElement {
  const e = document.createElement('button')
  e.className =
    'p-3 rounded-lg hover:bg-neutral-200 active:bg-neutral-300 cursor-pointer'
  e.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()

    const promise = fetchDeleteFiles(fileName)
    promise.then((res) => {
      res.text().then((text) => {
        // ...
        console.log(text)
      })
    })
  })

  return e
}

export { newFileComponent }
