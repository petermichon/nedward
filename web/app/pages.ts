import { Router } from './router.ts'

import { pageExample } from './pages/example.ts'
import { pageCollections } from './pages/collections.ts'
import { pageFiles } from './pages/files.ts'
import { pageEditor } from './pages/editor.ts'
import { pageGallery } from './pages/gallery.ts'
import { pageViewer } from './pages/viewer.ts'

const app = document.getElementById('app')

function loadRoutes() {
  if (!app) {
    throw new Error('app not found') // DEV
  }

  Router.routes.set('/example/', () => {
    pageExample()
  })

  Router.routes.set('/', () => {
    pageCollections()
  })

  Router.routes.set('/files/', () => {
    pageFiles()
  })

  Router.routes.set('/editor/', () => {
    pageEditor()
  })

  Router.routes.set('/gallery/', () => {
    pageGallery()
  })

  Router.routes.set('/viewer/', () => {
    pageViewer()
  })
}

export { loadRoutes }
