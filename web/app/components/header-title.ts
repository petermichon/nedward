function newTitleButtonComponent(): HTMLElement {
  const e = document.createElement('a')
  e.href = ''
  e.className =
    'px-4 py-2 rounded-full cursor-pointer text-lg font-semibold scale-y-110 bg-white hover:bg-neutral-100 active:bg-neutral-200'
  e.addEventListener('click', (e) => {
    e.preventDefault()
    // history.pushState({}, '', '/files/')
    // Router.navigate('/files/')
  })

  return e
}

export { newTitleButtonComponent }
