import { existsFile, getFile, overwriteFile, removeFile } from './core.ts'

class FileDB {
  // CRUD: Create
  static create(key: string, value: string) {
    const exists = existsFile(key)
    if (exists) {
      throw new Error('File already exists')
    }

    overwriteFile(key, value)
  }

  // CRUD: Read
  static get(key: string): string {
    const value = getFile(key)
    return value
  }

  // CRUD: Update
  static modify(key: string, value: string) {
    const exists = existsFile(key)
    if (!exists) {
      throw new Error("File doesn't exist")
    }

    const oldValue = getFile(key)
    if (oldValue === value) {
      throw new Error('Value is identical')
    }

    overwriteFile(key, value)
  }

  // CRUD: Delete
  static remove(key: string) {
    removeFile(key)
  }
}

export { FileDB }
