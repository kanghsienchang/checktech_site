<template>
  <div class="vendors main-container">
    <h2 class="vendors__heading mb-6">代理品牌</h2>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      <figure
        v-for="vendor of vendors"
        :key="vendor.image_alt"
        class="vendors__vendor group overflow-hidden rounded-md border shadow-sm transition-all duration-200 hover:-translate-y-1"
      >
        <img :src="vendor.image" :alt="vendor.image_alt" />
      </figure>
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
          image: require('@/assets/images/vendors/giesecke-devrient.jpeg')
        },
        {
          image_alt: 'idedapower',
          image: require('@/assets/images/vendors/idedapower.jpeg')
        },
        {
          image_alt: 'kyocera',
          image: require('@/assets/images/vendors/kyocera.jpeg')
        },
        {
          image_alt: 'sanico',
          image: require('@/assets/images/vendors/sanico.jpeg')
        },
        {
          image_alt: 'shinmei',
          image: require('@/assets/images/vendors/shinmei.jpeg')
        }
      ]
    }
  }
}
</script>

<style scoped></style>
