import { Router } from '../router.ts'

function newReturnButtonComponent(): HTMLElement {
  const params = {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  }

  const path = params.path

  // remove 1 path level
  // - '/a/b/'    -> '/a/'
  // - '/a/b.txt' -> '/a/'
  const n = path.endsWith('/') ? 2 : 1
  const returnPath = path.split('/').slice(0, -n).join('/') + '/'

  // let page = path === '/' ? '/' : '/files/'
  let page
  if (path === '/') {
    page = '/'
  } else {
    page = '/files/'
  }

  const finalPath = `${page}?path=${returnPath}`

  const e = document.createElement('a')
  e.className = 'flex items-center'
  e.href = finalPath
  e.title = 'Retour'
  e.className =
    'rounded-full p-3 cursor-pointer bg-white hover:bg-neutral-100 active:bg-neutral-200'
  e.addEventListener('click', (e) => {
    e.preventDefault()
    history.pushState({}, '', finalPath)
    Router.navigate(page)
  })
  {
    const e1 = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    e1.classList.add('h-6', 'w-6')
    e1.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    e1.setAttribute('fill', 'none')
    e1.setAttribute('viewBox', '0 0 24 24')
    e1.setAttribute('stroke', 'currentColor')
    e.appendChild(e1)

    {
      const e1a: SVGPathElement = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      e1a.setAttribute('stroke-linecap', 'round')
      e1a.setAttribute('stroke-linejoin', 'round')
      e1a.setAttribute('stroke-width', '2')
      e1a.setAttribute('d', 'M15 19l-7-7 7-7')
      e1.appendChild(e1a)
    }
  }

  return e
}

export { newReturnButtonComponent }
