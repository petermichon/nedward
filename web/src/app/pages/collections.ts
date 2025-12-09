import { newNavBarComponent } from '../components/nav.ts'
import { Router } from '../router.ts'

const app = document.getElementById('app')!

function pageCollections() {
  document.title = 'Nedward'

  const e = newCollectionPageComponent()

  // console.log(e)
  app.replaceChildren(e)
}

function newCollectionPageComponent() {
  const e = document.createElement('div')
  e.className =
    'max-w-sm min-h-screen mx-auto relative font-[MavenPro] antialiased bg-white p-0'
  {
    const eGrid = document.createElement('div')
    eGrid.className = 'grid grid-rows-[auto_1fr_auto] h-screen'
    {
      // const e1 = newTouchBackLeftBarComponent()
      // eGrid.appendChild(e1)

      const eTitle = newLogoButton()
      eGrid.appendChild(eTitle)

      const eProjects = document.createElement('div')
      {
        const e2b = newProjectsListComponent()
        eProjects.appendChild(e2b)
      }
      eGrid.appendChild(eProjects)

      const eNavBar = newNavBarComponent()
      eGrid.appendChild(eNavBar)
    }
    e.appendChild(eGrid)
  }

  return e
}

function newTouchBackLeftBarComponent() {
  const e = document.createElement('div')
  e.className =
    'absolute bottom-0 left-0 right-0 z-50 h-screen w-5 px-4 flex justify-between h-16'

  return e
}

function newLogoButton() {
  const e = document.createElement('a')
  e.href = ''
  e.className =
    'inline-block m-3 px-3 py-2 rounded-sm text-xl font-semibold text-black cursor-pointer hover:bg-neutral-100'
  e.textContent = 'nedward.eu'
  e.addEventListener('click', (e) => {
    e.preventDefault()
    // history.pushState({}, '', '/')
    // Router.navigate('/')
  })

  return e
}

function newProjectsListComponent() {
  const e = document.createElement('div')
  e.className = 'grid grid-cols-1 mb-16'
  {
    const e1 = newProjectComponent({
      title: 'Fichiers',
      description: '600 Mo de données',
      path: '/files/',
      params: '?path=/',
    })
    e.appendChild(e1)

    const e2 = newProjectComponent({
      title: 'Sites Web',
      description: '5 fichiers',
      path: '',
      params: '',
    })
    // e.appendChild(e2)

    const e3 = newProjectComponent({
      title: 'Galerie',
      description: '20 images',
      path: '/gallery/',
      params: '',
    })
    // e.appendChild(e3)

    const e4 = newProjectComponent({
      title: 'Playlist',
      description: '30 audios',
      path: '',
      params: '',
    })
    // e.appendChild(e4)

    const e5 = newProjectComponent({
      title: 'Notes',
      description: '18 notes',
      path: '',
      params: '',
    })
    // e.appendChild(e5)
  }

  return e
}

function newProjectComponent(project: {
  title: string
  description: string
  path: string
  params: string
}) {
  const e = document.createElement('a')
  e.title = project.title
  e.href = project.path
  e.className =
    'block feature-card relative ease-in-out p-2 rounded-sm cursor-pointer hover:bg-gray-100 hover:text-white'
  e.addEventListener('click', (e) => {
    e.preventDefault()
    history.pushState({}, '', project.path + project.params)
    Router.navigate(project.path)
  })
  {
    const e1 = document.createElement('div')
    e1.className = 'flex'
    {
      const e1a = document.createElement('div')
      e1a.className = 'items-center p-3'
      {
        const e1a1 = document.createElement('p')
        e1a1.className = 'text-lg leading-4 font-medium text-black'
        e1a1.textContent = project.title
        e1a.appendChild(e1a1)

        const e1a2 = document.createElement('p')
        e1a2.className = 'mt-2 text-gray-500'
        e1a2.textContent = project.description
        // e1a.appendChild(e1a2)
      }
      e1.appendChild(e1a)

      const e1b = document.createElement('p')
      e1b.className = 'ml-auto mr-4 flex items-center'
      {
        // const e1b1: any = document.createElement('svg')
        // e1b1.className = 'h-6 w-6 text-gray-400'
        // e1b1.xmlns = 'http://www.w3.org/2000/svg'
        // e1b1.fill = 'none'
        // e1b1.viewBox = '0 0 24 24'
        // e1b1.stroke = 'currentColor'
        // e1b.appendChild(e1b1)
        // {
        //   const e1b1a: any = document.createElement('path')
        //   e1b1a.className = 'items-center p-3'
        //   e1b1a.strokeLinecap = 'round'
        //   e1b1a.strokeLinejoin = 'round'
        //   e1b1a.strokeWidth = '2'
        //   e1b1a.d = 'M9 5l7 7-7 7'
        //   e1b1.appendChild(e1b1a)
        // }

        const e1b1 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        )
        e1b1.classList.add('h-6', 'w-6', 'text-black')
        e1b1.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        e1b1.setAttribute('fill', 'none')
        e1b1.setAttribute('viewBox', '0 0 24 24')
        e1b1.setAttribute('stroke', 'currentColor')
        {
          const e1b1a = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          )
          e1b1a.classList.add('items-center', 'p-3')
          e1b1a.setAttribute('stroke-linecap', 'round')
          e1b1a.setAttribute('stroke-linejoin', 'round')
          e1b1a.setAttribute('stroke-width', '2')
          e1b1a.setAttribute('d', 'M9 5l7 7-7 7')

          e1b1.appendChild(e1b1a)
        }
        e1b.appendChild(e1b1)
      }
      e1.appendChild(e1b)
    }
    e.appendChild(e1)
  }

  return e
}

export { pageCollections }
