import { newButtonComponent } from './button.ts'
import { newButtonTextComponent } from './button-text.ts'

import { fetchDeleteFiles } from '../queries/deleteFile.ts'

function newDeleteButtonComponent() {
  const e = newButtonComponent()
  e.title = 'Supprimer'

  e.addEventListener('click', () => {
    const name = '' // weird
    const promise = fetchDeleteFiles(name)
    promise.then((res) => {
      res.text().then((text) => {
        // ...
      })
    })
  })

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
      e1b1a.setAttribute('d', '')
      e2.appendChild(e1b1a)
    }
    e.appendChild(e2)
  }

  {
    const eText = newButtonTextComponent()
    eText.textContent = 'Supprimer' // ⛌
    e.appendChild(eText)
  }

  return e
}

export { newDeleteButtonComponent }
