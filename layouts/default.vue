<template>
  <div class="default-layout">
    <nav-menu />
    <div class="content-wrapper">
      <nuxt-child />
    </div>
    <app-footer />
  </div>
</template>

<script>
import NavMenu from '~/layouts/components/NavMenu'
import AppFooter from '~/layouts/components/AppFooter'
export default {
  name: 'DefaultLayout',
  components: { AppFooter, NavMenu },
  head () {
    return {
      meta: [
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: '大將科技' },
        { hid: 'og-desc', property: 'og:description', content: '測試大將官網' },
        { hid: 'og-image', property: 'og:image', content: require('@/assets/images/logo.png') }
      ]
    }
  }
}
</script>

<style scoped>

</style>
