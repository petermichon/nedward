type Error = any

function removeFileDir(path: string): Error {
  try {
    Deno.removeSync(path, { recursive: false })
    return null
  } catch (error) {
    return error
  }
}

export { removeFileDir }
