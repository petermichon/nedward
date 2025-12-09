import { Router } from '../router.ts'

function newNavBarComponent(): HTMLElement {
  const e = document.createElement('div')
  e.className =
    'grid grid-flow-col auto-cols-fr items-center bg-white border-t border-neutral-200' // h-12.5
  {
    const svgPathData =
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    const home = newNavBarButtonComponent('Accueil', svgPathData, '/')
    e.appendChild(home)
  }
  {
    const svgPathData =
      'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    const you = newNavBarButtonComponent('Vous', svgPathData, '/')
    e.appendChild(you)
  }

  return e
}

function newNavBarButtonComponent(
  title: string,
  svgPathData: string,
  path: string
): HTMLElement {
  const e = document.createElement('button')
  e.className =
    'flex flex-col items-center py-0 bg-white hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer py-2'
  e.addEventListener('click', (e) => {
    // e.preventDefault()
    history.pushState({}, '', path)
    Router.navigate(path)
  })
  {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.classList.add('h-6', 'w-6') // 'mt-1.5'
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('fill', 'none')
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('stroke', 'currentColor')
    {
      const icon = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      icon.setAttribute('stroke-linecap', 'round')
      icon.setAttribute('stroke-linejoin', 'round')
      icon.setAttribute('stroke-width', '2')
      icon.setAttribute('d', svgPathData)
      svg.appendChild(icon)
    }
    e.appendChild(svg)
  }
  {
    const text = document.createElement('p')
    text.className =
      'text-black font-[450] text-[10px] leading-none -translate-y-0.25'
    text.textContent = title
    e.appendChild(text)
  }

  return e
}

export { newNavBarComponent }
