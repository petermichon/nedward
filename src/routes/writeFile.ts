type Error = any

function writeFile(path: string, data: string): Error {
  try {
    // writeTextSync ?
    Deno.writeTextFileSync(path, data)
  } catch (err) {
    return err
  }
  return null
}

export { writeFile }
