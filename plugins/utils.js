function toCDN(url) {
  if (!url || typeof url !== 'string') return ''
  return url.replace(
    process.env.NUXT_ENV_S3_DOMAIN,
    process.env.NUXT_ENV_CDN_DOMAIN
  )
}

export default ({ app }, inject) => {
  inject('toCDN', toCDN)
}
