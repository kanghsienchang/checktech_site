import Vue from 'vue'
import VueGtm from '@gtm-support/vue2-gtm'

export default ({ app }) => {
  Vue.use(VueGtm, {
    id: process.env.NUXT_GTM_ID,
    enabled: process.env.NODE_ENV === 'development',
    vueRouter: app.router,
    trackOnNextTick: false
  })
}
