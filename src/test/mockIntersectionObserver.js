export function installIntersectionObserverMock() {
  const instances = []

  class MockIntersectionObserver {
    constructor(callback) {
      this.callback = callback
      this.observedNodes = new Set()
      instances.push(this)
    }
    observe(node) {
      this.observedNodes.add(node)
    }
    unobserve(node) {
      this.observedNodes.delete(node)
    }
    disconnect() {
      this.observedNodes.clear()
    }
    trigger(isIntersecting) {
      this.callback([{ isIntersecting }], this)
    }
  }

  globalThis.IntersectionObserver = MockIntersectionObserver
  return instances
}
