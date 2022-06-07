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
          image: '/images/clients/acer.png'
        },
        {
          image_alt: 'cisco',
          image: '/images/clients/cisco.png'
        },
        {
          image_alt: 'dell',
          image: '/images/clients/dell.png'
        },
        {
          image_alt: 'hitachi',
          image: '/images/clients/hitachi.png'
        },
        {
          image_alt: 'hp',
          image: '/images/clients/hp.png'
        },
        {
          image_alt: 'huawei',
          image: '/images/clients/huawei.png'
        },
        {
          image_alt: 'lg',
          image: '/images/clients/lg.png'
        },
        {
          image_alt: 'netgear',
          image: '/images/clients/netgear.png'
        },
        {
          image_alt: 'nokia',
          image: '/images/clients/nokia.png'
        },
        {
          image_alt: 'pace',
          image: '/images/clients/pace.png'
        },
        {
          image_alt: 'philips',
          image: '/images/clients/philips.png'
        },
        {
          image_alt: 'samsung',
          image: '/images/clients/samsung.png'
        },
        {
          image_alt: 'sony',
          image: '/images/clients/sony.png'
        },
        {
          image_alt: 'toshiba',
          image: '/images/clients/toshiba.png'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
