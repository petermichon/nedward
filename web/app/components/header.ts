import { newReturnButtonComponent } from './header-return.ts'
import { newTitleButtonComponent } from './header-title.ts'

function newHeaderComponent(title: string): HTMLElement {
  const e = document.createElement('div')
  e.className = 'flex gap-2 p-1 items-center'
  {
    const e1a = newReturnButtonComponent()
    e.appendChild(e1a)

    const e1b = newTitleButtonComponent()
    e1b.textContent = title
    e1b.title = title

    e.appendChild(e1b)
  }
  return e
}

export { newHeaderComponent }
