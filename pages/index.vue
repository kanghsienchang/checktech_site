<template>
  <div class="home">
    <home-header />
    <div class="content">
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
  @apply py-14 md:py-20;
  & > *:not(:first-child) {
    @apply pt-14 md:pt-20;
  }
}
</style>
