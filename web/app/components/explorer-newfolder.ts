import { newButtonTextComponent } from './button-text.ts'
import { newButtonComponent } from './button.ts'

function newExplorerNewfolder(): HTMLElement {
  const e = newButtonComponent()
  e.title = 'Nouveau'
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
    const text = newButtonTextComponent()
    text.textContent = 'Nouveau'
    e.appendChild(text)
  }

  e.addEventListener('click', () => {
    const folderName = prompt('Créer un nouveau dossier') || ''

    const params = {
      path: new URLSearchParams(globalThis.location.search).get('path')!,
    }

    if (folderName) {
      const path = params.path + folderName
      const promise = postFolder(path)
    }
  })

  return e
}

const env = {
  domain: 'localhost:8443',
}

async function postFolder(path: string): Promise<Response> {
  console.log(path)

  const domain = env.domain
  const url = `https://${domain}/api/v1/folder?path=${path}`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
  })

  return response
}

export { newExplorerNewfolder }
