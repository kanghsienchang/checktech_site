<template>
  <div class="home">
    <home-header />
    <div class="content">
      <about-us />
      <statistics class="bg-light" />
      <service-map />
      <products />
      <vendors />
      <services class="!pb-0" />
      <features class="-mt-10 bg-light !pt-[7rem] md:!pt-[9rem]" />
      <quality-assurance />
      <contact-us class="bg-light" />
    </div>
  </div>
</template>

<script>
import Header from '~/components/home/Header'
import Products from '~/components/home/Products'
import Vendors from '~/components/home/Vendors'
import Services from '~/components/home/Services'
import Features from '~/components/home/Features'
import QualityAssurance from '~/components/home/QualityAssurance'
import AboutUs from '~/components/home/AboutUs'
import Statistics from '~/components/home/Statistics'
import ServiceMap from '~/components/home/ServiceMap'
import ContactUs from '~/components/home/ContactUs'
export default {
  name: 'Home',
  components: {
    ContactUs,
    ServiceMap,
    Statistics,
    AboutUs,
    QualityAssurance,
    Features,
    Services,
    Vendors,
    Products,
    HomeHeader: Header
  },
  scrollToTop: true,
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.content {
  //@apply py-20 pb-32 md:py-24 md:pb-40;
  & > * {
    @apply py-16 md:py-20;
  }
}
</style>
