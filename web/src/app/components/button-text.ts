function newButtonTextComponent(): HTMLElement {
  const e = document.createElement('p')
  e.className =
    'px-1 text-black text-sm font-medium tracking-tight scale-y-110 leading-none -translate-y-0.25'

  return e
}

export { newButtonTextComponent }
