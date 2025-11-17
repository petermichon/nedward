type Error = any

function deleteFile(path: string): Error {
  try {
    Deno.removeSync(path, { recursive: false })
    return null
  } catch (error) {
    return error
  }
}

export { deleteFile }
