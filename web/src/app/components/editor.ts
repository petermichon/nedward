import { newEditorReloadComponent } from './editor-reload.ts'
import { newFileContentTextComponent } from './editor-content.ts'
import { newSaveButtonComponent } from './editor-save.ts'
import { newDeleteButtonComponent } from './editor-delete.ts'

function newFileEditorComponent(): HTMLElement {
  const e = document.createElement('div')
  e.className = 'grid grid-rows-[auto_1fr_auto] overflow-y-auto'
  {
    const eEditor = document.createElement('div')
    eEditor.className =
      'bg-neutral-50 overflow-y-auto scrollbar-invisible hover-scrollbar-visible'
    {
      const eContent = newFileContentTextComponent()
      {
        const eButtons = document.createElement('div')
        eButtons.className =
          'grid grid-flow-col auto-cols-max gap-2 overflow-x-auto p-2 border-b-1 border-neutral-200 scrollbar-invisible'
        {
          const eReload = newEditorReloadComponent(eContent)
          eButtons.appendChild(eReload)
          eReload.click()

          const eSave = newSaveButtonComponent(eContent)
          eButtons.appendChild(eSave)

          const eDelete = newDeleteButtonComponent()
          eButtons.appendChild(eDelete)

          // const eDummy2 = newReloadButtonComponent(eContent)
          // eButtons.appendChild(eDummy2)
        }
        e.appendChild(eButtons)
      }
      eEditor.appendChild(eContent)
    }
    e.appendChild(eEditor)
  }

  return e
}

export { newFileEditorComponent }
