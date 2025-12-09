import { newFileEditorComponent } from '../components/editor.ts'
import { newHeaderComponent } from '../components/header.ts'
import { newNavBarComponent } from '../components/nav.ts'

const app = document.getElementById('app')!

function pageEditor() {
  const params = {
    path: new URLSearchParams(globalThis.location.search).get('path')!,
  }
  const path = params.path
  const filename = path.split('/').pop()!
  document.title = `${filename} - Nedward`

  const e = newFileEditorPageComponent()
  app.replaceChildren(e)
}

function newFileEditorPageComponent() {
  const e = document.createElement('div')
  e.className = 'max-w-sm mx-auto relative font-[MavenPro] antialiased bg-white'
  //  min-h-screen
  {
    const eGrid = document.createElement('div')
    eGrid.className = 'grid grid-rows-[auto_1fr_auto] h-screen'
    {
      const header = newHeaderComponent('Editeur')
      eGrid.appendChild(header)

      const eEditor = newFileEditorComponent()
      eGrid.appendChild(eEditor)

      const navBar = newNavBarComponent()
      eGrid.appendChild(navBar)
    }
    e.appendChild(eGrid)
  }

  return e
}

// function pageEditorArchive() {
//   const html = `
//       <div
//         class="max-w-sm relative min-h-screen mx-auto flex flex-col font-[MavenPro] antialiased bg-white"
//       >
//         <div class="absolute bottom-0 left-0 right-0 z-50 h-screen w-5"></div>

//         <div class="w-full z-10">
//           <div class="px-4">
//             <div class="flex justify-between my-2">
//               <div class="flex">
//                 <div class="flex items-center">
//                   <a
//                     id="back-button"
//                     href="/files/"
//                     title="Retour"
//                     class="rounded-full p-3 hover:bg-gray-100 cursor-pointer"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       class="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M15 19l-7-7 7-7"
//                       />
//                     </svg>
//                   </a>

//                   <a
//                     href=""
//                     title="..."
//                     class="flex items-center hover:bg-gray-100 cursor-pointer rounded-full m-2"
//                   >
//                     <div class="px-2 py-2">
//                       <div class="bg-neutral-300 rounded-full p-4"></div>
//                     </div>
//                     <span
//                       id="filename"
//                       class="font-semibold text-lg text-gray-900 pr-4"
//                     ></span>
//                   </a>

//                   <button
//                     id="delete-button"
//                     title="Supprimer"
//                     class="rounded-full p-2 cursor-pointer text-black bg-red-300 hover:bg-red-400"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       class="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="bg-neutral-50 mb-16">
//           <div
//             id="file-editor"
//             class="w-full h-full overflow-auto rounded-lg leading-tight tracking-tight whitespace-pre-wrap break-words font-mono text-sm p-5 focus:outline-none rounded-none resize-none"
//             contenteditable="true"
//             spellcheck="false"
//           ></div>
//         </div>

//         <nav
//           class="absolute bottom-0 left-0 right-0 z-50 fixed max-w-sm mx-auto"
//         >
//           <div class="grid-cols-2">
//             <div class="flex items-center justify-end">
//               <a
//                 id="save-button"
//                 title="Enregistrer"
//                 class="flex items-center justify-center w-13 h-13 bg-lime-400 text-lime-800 text-3xl rounded-2xl hover:bg-lime-300/90 cursor-pointer m-5 shadow-md transition-colors duration-300 ease-in-out"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   class="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </a>
//             </div>
//             <div id="nav-bar"></div>
//           </div>
//         </nav>
//       </div>`

//   app.innerHTML = html

//   {
//     const global = {
//       app: document.getElementById('app')!,
//       fileEditor: document.getElementById('file-editor')!,
//       navBar: document.getElementById('nav-bar')!,
//       backButton: document.getElementById('back-button')! as HTMLAnchorElement,
//       fileName: document.getElementById('filename')!,
//       saveButton: document.getElementById('save-button')!,
//       deleteButton: document.getElementById('delete-button')!,

//       params: {
//         path: new URLSearchParams(globalThis.location.search).get('path') || '',
//       },
//     }

//     const domain = 'localhost:8443'
//     // const domain = 'narval.petermichon.fr'
//     const path = `${global.params.path}`
//     const url = `https://${domain}/api/v1/files/content?path=${path}`

//     const filename = path.split('/').pop() || ''
//     global.fileName.textContent = filename

//     document.title = `${filename} - Nedward`

//     const returnPath = path.split('/').slice(0, -1).join('/') + '/'

//     global.backButton.href = `/files/?path=${returnPath}`

//     global.backButton.addEventListener('click', (e) => {
//       e.preventDefault()
//       history.pushState({}, '', `/files/?path=${returnPath}`) // TODO
//       Router.navigate('/files/') // TODO
//     })

//     global.saveButton.addEventListener('click', () => {
//       saveContent()
//     })

//     global.fileEditor.addEventListener('keydown', (e) => {
//       if (e.key === 'Enter') {
//         e.preventDefault() // Prevent default behavior (inserting <div> or <br>)
//         const selection = globalThis.getSelection()!
//         const range = selection.getRangeAt(0)
//         const textNode = document.createTextNode('\n')
//         range.insertNode(textNode)
//         range.setStartAfter(textNode)
//         range.setEndAfter(textNode)
//         selection.removeAllRanges()
//         selection.addRange(range)
//       }
//     })

//     document.addEventListener('keydown', (e) => {
//       if ((e.ctrlKey || e.metaKey) && e.key === 's') {
//         e.preventDefault() // Prevent the browser's save dialog
//         saveContent() // Call your save function
//       }
//     })

//     // deno-lint-ignore no-inner-declarations
//     function saveContent() {
//       const text = global.fileEditor.textContent
//       const url = `https://${domain}/api/v1/files/content?path=${path}`

//       const res = fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'text/plain',
//         },
//         body: text,
//       })
//       res.then(() => {
//         global.saveButton.classList.add('bg-white')
//         global.saveButton.classList.remove('bg-lime-400')
//         setTimeout(() => {
//           global.saveButton.classList.add('bg-lime-400')
//           global.saveButton.classList.remove('bg-white')
//         }, 1000)
//       })
//     }

//     global.deleteButton.addEventListener('click', () => {
//       const fileIsEmpty = global.fileEditor.textContent === ''
//       if (fileIsEmpty) {
//         const url = `https://${domain}/api/v1/files?path=${path}`
//         const res = fetch(url, {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'text/plain',
//           },
//         })
//         res.then(() => {
//           // force return to previous page
//           globalThis.location.href = `/files/?path=${returnPath}`
//         })
//       }
//       if (!fileIsEmpty) {
//         global.deleteButton.classList.add('bg-neutral-400')
//         global.deleteButton.classList.remove('bg-red-300')
//         global.deleteButton.classList.remove('hover:bg-red-400')
//         setTimeout(() => {
//           global.deleteButton.classList.add('hover:bg-red-400')
//           global.deleteButton.classList.add('bg-red-300')
//           global.deleteButton.classList.remove('bg-neutral-400')
//         }, 1000)
//       }
//     })

//     fetch(url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'text/plain',
//         // 'Content-Type': 'application/octet-stream',
//       },
//     }).then((res) => {
//       res.text().then((text) => {
//         const content = text
//         global.fileEditor.textContent = content
//       })
//     })

//     {
//       const node = document.createElement('div')
//       // node.innerHTML = newNavBarComponent()
//       global.navBar.appendChild(node)
//     }
//   }
// }

export { pageEditor }
