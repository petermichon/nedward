class Router {
  public routes = new Map<string, () => void>()

  public navigate(path: string) {
    const handler = this.routes.get(path)
    if (!handler) {
      throw new Error(`${path} : route not found`) // DEV
    }
    handler()
  }
}

export { Router }
