export default ({ app, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (process.server) {
      return next()
    }
    store.dispatch('parsePlatform')
    return next()
  })
}
