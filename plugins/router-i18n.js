export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    const availableLocales = app.i18n.locales.reduce(
      (acc, { code }) => [...acc, code],
      []
    )
    const localeQuery = to.query?.locale

    if (localeQuery === app.i18n.locale) {
      return next()
    }

    if (availableLocales.includes(localeQuery)) {
      app.i18n.setLocale(localeQuery)
      return next()
    }

    return next({ ...to, query: { ...to.query, locale: app.i18n.locale } })
  })
}
