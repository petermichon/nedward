import { Router } from './router.ts'
import { loadRoutes } from './pages.ts'

function main() {
  const path = globalThis.location.pathname

  loadRoutes()

  // console.log(path) // DEV

  globalThis.addEventListener('popstate', (event) => {
    Router.navigate(globalThis.location.pathname)
  })

  globalThis.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })

  Router.navigate(path)
}

export { main }
