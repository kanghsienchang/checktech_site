<template>
  <section class="customers bg-white">
    <div class="main-container">
      <div class="mb-6 text-center">
        <h2 ref="heading1" class="mb-2">Trusted by over 2500+ clients</h2>
        <h3 ref="heading2">
          We bring solutions to make life easier for our customers
        </h3>
      </div>
      <div
        ref="content"
        class="mt-6 grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10"
      >
        <figure
          v-for="company of companies"
          :key="company.image_alt"
          class="company-logo"
        >
          <img v-lazy="company.image" :alt="company.image_alt" />
        </figure>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Clients',
  data() {
    return {
      companies: [
        {
          image_alt: 'acer',
          image: require('@/assets/images/clients/acer.png')
        },
        {
          image_alt: 'cisco',
          image: require('@/assets/images/clients/cisco.png')
        },
        {
          image_alt: 'dell',
          image: require('@/assets/images/clients/dell.png')
        },
        {
          image_alt: 'hitachi',
          image: require('@/assets/images/clients/hitachi.png')
        },
        {
          image_alt: 'hp',
          image: require('@/assets/images/clients/hp.png')
        },
        {
          image_alt: 'huawei',
          image: require('@/assets/images/clients/huawei.png')
        },
        {
          image_alt: 'lg',
          image: require('@/assets/images/clients/lg.png')
        },
        {
          image_alt: 'netgear',
          image: require('@/assets/images/clients/netgear.png')
        },
        {
          image_alt: 'nokia',
          image: require('@/assets/images/clients/nokia.png')
        },
        {
          image_alt: 'pace',
          image: require('@/assets/images/clients/pace.png')
        },
        {
          image_alt: 'philips',
          image: require('@/assets/images/clients/philips.png')
        },
        {
          image_alt: 'samsung',
          image: require('@/assets/images/clients/samsung.png')
        },
        {
          image_alt: 'sony',
          image: require('@/assets/images/clients/sony.png')
        },
        {
          image_alt: 'toshiba',
          image: require('@/assets/images/clients/toshiba.png')
        }
      ]
    }
  }
}
</script>

<style scoped></style>
