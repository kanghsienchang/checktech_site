<template>
  <div class="home">
    <home-header />
    <about-us />
    <statistics />
    <service-map />
    <products />
    <vendors />
    <services />
    <features />
    <quality-assurance />
    <contact-us />
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
  name: 'Index',
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
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
//.content {
//  //@apply py-20 pb-32 md:py-24 md:pb-40;
//  & > *:not(:first-child) {
//    @apply pt-16 md:pt-20;
//  }
//}
</style>
