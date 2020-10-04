function createAnalytics() {
  let counter = 0
  let isRemoved = false

  const listener = () => counter++

  document.addEventListener('click', listener)

  return {
    remove() {
      document.removeEventListener('click', listener)
      isRemoved = true
    },

    getCounter() {
      if (isRemoved) {
        return `Analytics is removed. Total clicks: ${counter}`
      }
      return counter
    }
  }
}

window.analytics = createAnalytics()
