<template>
  <div>
    <home-header />
    <clients class="py-20" />
    <products class="py-20" />
  </div>
</template>

<script>
import Header from '~/components/home/Header'
import Products from '~/components/home/Products'
import Clients from '~/components/home/Clients'
export default {
  name: 'Home',
  components: { Clients, Products, HomeHeader: Header },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
</style>
