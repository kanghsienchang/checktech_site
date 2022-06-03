export default ({ app }, inject) => {
  function getApiDataTranslation(data, attributeKey) {
    const attribute = data?.attributes?.[attributeKey]
    if (!attribute) return undefined
    if (Array.isArray(attribute)) {
      return attribute.map((item) => item[app.i18n.localeProperties.dataKey])
    } else {
      return attribute[app.i18n.localeProperties.dataKey]
    }
  }

  inject('getApiDataTranslation', getApiDataTranslation)
}
