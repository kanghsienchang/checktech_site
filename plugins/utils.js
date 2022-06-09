function toCDN(url) {
  if (!url || typeof url !== 'string') return ''
  return url.replace(process.env.NUXT_S3_DOMAIN, process.env.NUXT_CDN_DOMAIN)
}

export default ({ app }, inject) => {
  inject('toCDN', toCDN)
}
