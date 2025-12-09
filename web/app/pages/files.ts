import { newFileExplorerComponent } from '../components/explorer.ts'
import { newHeaderComponent } from '../components/header.ts'
import { newNavBarComponent } from '../components/nav.ts'

const app = document.getElementById('app')!

function pageFiles() {
  document.title = 'Fichiers - Nedward'

  const e = newFilesPageComponent()

  app.replaceChildren(e)
}

function newFilesPageComponent() {
  const e = document.createElement('div')
  e.className = 'max-w-sm mx-auto relative font-[MavenPro] antialiased bg-white'

  {
    const eGrid = document.createElement('div')
    eGrid.className = 'grid grid-rows-[auto_1fr_auto] h-screen'
    {
      const header = newHeaderComponent('Fichiers')
      eGrid.appendChild(header)

      const eExplorer = newFileExplorerComponent()
      eGrid.appendChild(eExplorer)

      const eNav = newNavBarComponent()
      eGrid.appendChild(eNav)
    }
    e.appendChild(eGrid)
  }

  return e
}

export { pageFiles }
