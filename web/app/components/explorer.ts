import { newExplorerImportComponent } from './explorer-import.ts'
import { newExplorerNewfolder } from './explorer-newfolder.ts'
import { newExplorerReloadComponent } from './explorer-reload.ts'

function newFileExplorerComponent(): HTMLElement {
  const eExplorer = document.createElement('div')
  eExplorer.className = 'grid grid-rows-[auto_1fr_auto] overflow-y-auto'
  {
    const eList = document.createElement('div')
    eList.className =
      'grid grid-cols-1 overflow-y-auto content-start scrollbar-invisible hover-scrollbar-visible'
    // scrollbar
    // scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full
    //  md:scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-thumb-neutral-800/50
    {
      const eButtons = document.createElement('div')
      eButtons.className =
        'grid grid-flow-col auto-cols-max gap-2 overflow-x-auto p-2 border-b-1 border-neutral-200 scrollbar-invisible'
      {
        const eReload = newExplorerReloadComponent(eList)
        eButtons.appendChild(eReload)
        eReload.click()

        const eImport = newExplorerImportComponent()
        eButtons.appendChild(eImport)

        const eNewfolder = newExplorerNewfolder()
        eButtons.appendChild(eNewfolder)

        const eDummy2 = newExplorerImportComponent()
        // eButtons.appendChild(eDummy2)
      }
      eExplorer.appendChild(eButtons)
    }
    eExplorer.appendChild(eList)
  }
  return eExplorer
}

export { newFileExplorerComponent }
