import { Router } from '../router.ts'

import { newNavBarComponent } from '../components/nav.ts'

const app = document.getElementById('app')!

function pageViewer() {
  const params = {
    path: new URLSearchParams(globalThis.location.search).get('path') || '',
  }
  const path = params.path
  const fileName = path.split('/').pop()

  document.title = `${fileName} - Nedward`

  const html = `
      <div
        class="max-w-sm relative min-h-screen mx-auto flex flex-col font-[MavenPro] antialiased bg-white"
      >
        <div class="absolute bottom-0 left-0 right-0 z-50 h-screen w-5"></div>

        <div class="w-full z-10">
          <div class="px-4">
            <div class="flex justify-between my-2">
              <div class="flex">
                <div class="flex items-center">
                  <a
                    id="back-button"
                    href="/gallery/"
                    title="Retour"
                    class="rounded-full p-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </a>
                  <a
                    href=""
                    title="Mon Site Web"
                    class="flex items-center hover:bg-gray-100 cursor-pointer rounded-full m-2"
                  >
                    <div class="px-2 py-2">
                      <div class="bg-neutral-300 rounded-full p-4"></div>
                    </div>
                    <span class="font-semibold text-lg text-gray-900 pr-4">
                      Galerie
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="py-4">
          <div class="max-w-7xl mx-auto">
            <div id="picture-viewer" class="bg-gray-100"></div>
          </div>
        </div>

        <div class="py-10"></div>

        <nav
          class="absolute bottom-0 left-0 right-0 z-50 fixed max-w-sm mx-auto"
        >
          <div class="grid-cols-2">
            <div class="flex items-center justify-end">
              <a
                href=""
                title="Nouveau"
                class="flex items-center justify-center w-13 h-13 bg-lime-400 text-lime-800 text-3xl rounded-2xl hover:bg-lime-300/90 cursor-pointer m-5 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </a>
            </div>
            <div id="nav-bar"></div>
          </div>
        </nav>
      </div>
    `

  app.innerHTML = html

  {
    const global = {
      app: document.getElementById('app')!,
      pictureViewer: document.getElementById('picture-viewer')!,
      navBar: document.getElementById('nav-bar')!,
      backButton: document.getElementById('back-button')!,

      params: {
        path: new URLSearchParams(globalThis.location.search).get('path') || '',
      },
    }

    {
      global.backButton.addEventListener('click', (e) => {
        // if (e.button === 0) { // useless ?
        //   e.preventDefault()
        // }
        e.preventDefault()
        history.pushState({}, '', '/gallery/')
        Router.navigate('/gallery/')
      })
    }

    const domain = 'localhost:8443'
    const path = `${global.params.path}`
    const url = `https://${domain}/api/v1/files/content?path=${path}`

    const node = document.createElement('div')
    node.innerHTML = `
          <div class="w-full h-full rounded-xs">
            <img
              class="object-cover w-full h-full"
              src="${url}"
              alt="${path}"
              style="image-rendering: auto"
            />
          </div>
        `
    global.pictureViewer.appendChild(node)

    {
      const node = newNavBarComponent()
      global.navBar.appendChild(node)
    }
  }
}

export { pageViewer }
