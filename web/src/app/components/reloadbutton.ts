import { newButtonComponent } from './button.ts'
import { newButtonTextComponent } from './button-text.ts'

function newReloadButtonComponent(): HTMLElement {
  const e = newButtonComponent()
  e.title = 'Rafraîchir'
  {
    const e2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    e2.classList.add('h-4.5', 'w-4.5')
    e2.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    e2.setAttribute('fill', 'none')
    e2.setAttribute('viewBox', '0 0 24 24')
    e2.setAttribute('stroke', 'currentColor')
    {
      const e1b1a = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      )
      e1b1a.classList.add('items-center', 'p-3')
      e1b1a.setAttribute('stroke-linecap', 'round')
      e1b1a.setAttribute('stroke-linejoin', 'round')
      e1b1a.setAttribute('stroke-width', '2')
      e1b1a.setAttribute(
        'd',
        'M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14'
      )
      e2.appendChild(e1b1a)
    }
    e.appendChild(e2)
  }
  {
    const eText = newButtonTextComponent()
    eText.textContent = 'Rafraîchir' // ↻
    e.appendChild(eText)
  }

  return e
}

export { newReloadButtonComponent }
