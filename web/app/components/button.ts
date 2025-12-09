function newButtonComponent(): HTMLElement {
  const e = document.createElement('button')
  e.className =
    'flex items-center gap-1 px-3 py-2 rounded-full cursor-pointer bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300'

  return e
}

export { newButtonComponent }
