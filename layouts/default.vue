<template>
  <div class="default-layout">
    <nav-menu />
    <div class="content-wrapper">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
import NavMenu from '~/layouts/components/NavMenu'
export default {
  name: 'DefaultLayout',
  components: { NavMenu }
}
</script>

<style scoped>

</style>
