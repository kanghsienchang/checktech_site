<template>
  <div class="home">
    <home-header />
    <div class="content py-20">
      <clients />
      <products />
      <vendors />
      <services />
      <features />
      <quality-assurance />
    </div>
  </div>
</template>

<script>
import Header from '~/components/home/Header'
import Products from '~/components/home/Products'
import Clients from '~/components/home/Clients'
import Vendors from '~/components/home/Vendors'
import Services from '~/components/home/Services'
import Features from '~/components/home/Features'
import QualityAssurance from '~/components/home/QualityAssurance'
export default {
  name: 'Home',
  components: { QualityAssurance, Features, Services, Vendors, Clients, Products, HomeHeader: Header },
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.content {
  & > *:not(:first-child) {
    @apply pt-20;
  }
}
</style>
