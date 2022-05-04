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
  components: { AppFooter, NavMenu }
}
</script>

<style scoped>

</style>
