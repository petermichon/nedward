function newFileContentTextComponent(): HTMLElement {
  const editor = document.createElement('div')
  editor.className =
    'w-full h-full overflow-y rounded-lg leading-tight tracking-tight whitespace-pre-wrap break-words font-mono text-sm focus:outline-none rounded-none resize-none p-5'
  // p-5: text selection from edges not working for big files
  editor.contentEditable = 'true'
  editor.spellcheck = false

  return editor
}

export { newFileContentTextComponent }
