const app = document.getElementById('app')!

function pageExample() {
  document.title = 'Nedward - Example'

  const e = document.createElement('p')
  e.className = 'text-white font-semibold font-[MavenPro] p-3 text-2xl'
  e.textContent = 'Example'

  app.replaceChildren(e)
}

export { pageExample }
