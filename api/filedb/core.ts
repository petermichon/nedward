function existsFile(key: string): boolean {
  try {
    Deno.statSync(key)
    return true
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false
    }
    throw error
  }
}

function getFile(key: string): string {
  const value = Deno.readTextFileSync(key)
  return value
}

function overwriteFile(key: string, value: string) {
  Deno.writeTextFileSync(key, value)
}

function removeFile(key: string) {
  Deno.removeSync(key, { recursive: false })
}

export { existsFile, getFile, overwriteFile, removeFile }
