function tests() {
  const html =
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '  <head>\n' +
    '    <title>Example</title>\n' +
    '  </head>\n' +
    '  <body>\n' +
    '    <div>Example</div>\n' +
    '  </body>\n' +
    '</html>\n'

  {
    const root = './public'
    const project = '/example'
    const path = '/index.html'
    // FileDB.create(root + project + path, html)
  }

  {
    // const value = FileDB.get('./public/example/index.html')
    // console.log('value:', value)
  }

  {
    // FileDB.modify('./public/example/index.html', 'Modified')
  }

  {
    // FileDB.remove('./public/example/index.html')
  }
}
