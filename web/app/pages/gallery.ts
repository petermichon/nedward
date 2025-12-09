import { Router } from '../router.ts'

import { newNavBarComponent } from '../components/nav.ts'
// import { newPictureComponent } from '../components-archive/picture.ts'

const app = document.getElementById('app')!

function pageGallery() {
  document.title = 'Galerie - Nedward'

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
                    href="/"
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
            <div
              id="pictures-list"
              class="grid grid-cols-3 space-y-0 gap-x-0.25 gap-y-0.25 mb-12"
            ></div>
          </div>
        </div>

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
      picturesList: document.getElementById('pictures-list')!,
      navBar: document.getElementById('nav-bar')!,
      backButton: document.getElementById('back-button')!,
    }

    {
      global.backButton.addEventListener('click', (e) => {
        // if (e.button === 0) { // useless ?
        //   e.preventDefault()
        // }
        e.preventDefault()
        history.pushState({}, '', '/')
        Router.navigate('/')
      })
    }

    const domain = 'localhost:8443'
    const path = `/gallery`
    const url = `https://${domain}/api/v1/files?path=${path}`

    fetch(url).then((res) => {
      res.json().then((files) => {
        for (const file of files) {
          const node = document.createElement('div')
          // newPictureComponent(file)
          global.picturesList.appendChild(node)
          {
            node.addEventListener('click', (e) => {
              e.preventDefault()
              const path = `/viewer/?path=/gallery/${file.name}`
              history.pushState({}, '', path)
              Router.navigate('/viewer/')
            })
          }
        }
      })
    })

    {
      const node = newNavBarComponent()
      global.navBar.appendChild(node)
    }
  }
}

export { pageGallery }
