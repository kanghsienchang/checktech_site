<template>
  <div class="vendors main-container my-16 md:my-20">
    <h2 class="vendors__heading mb-6">代理品牌</h2>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
      <a
        v-for="vendor of vendors"
        :key="vendor.image_alt"
        :href="vendor.link"
        rel="noreferrer noopener"
        target="_blank"
      >
        <figure
          class="vendors__vendor group overflow-hidden rounded-md border shadow-sm transition-all duration-200 hover:-translate-y-1"
        >
          <img :src="vendor.image" :alt="vendor.image_alt" />
        </figure>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vendors',
  data() {
    return {
      vendors: [
        {
          image_alt: 'giesecke-devrient',
          image: require('@/assets/images/vendors/giesecke-devrient.jpeg'),
          link: 'https://www.gi-de.com'
        },
        {
          image_alt: 'idedapower',
          image: require('@/assets/images/vendors/idedapower.jpeg'),
          link: 'http://www.cztpower.com'
        },
        {
          image_alt: 'kyocera',
          image: require('@/assets/images/vendors/kyocera.jpeg'),
          link: 'https://taiwan.kyocera.com'
        },
        {
          image_alt: 'sanico',
          image: require('@/assets/images/vendors/sanico.jpeg'),
          link: 'http://www.sanicoecm.com'
        },
        {
          image_alt: 'shinmei',
          image: require('@/assets/images/vendors/shinmei.jpeg'),
          link: 'http://www.shinmei-e.co.jp'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
