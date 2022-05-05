<template>
  <div class="vendors main-container">
    <h2 class="mb-2">
      代理品牌
    </h2>
    <h3>
      Lorem ipsum dolor sit amet
    </h3>
    <div
      class="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <figure
        v-for="vendor of vendors"
        :key="vendor.image_alt"
        class="vendor-image group rounded-md border shadow-sm overflow-hidden"
      >
        <img
          :src="vendor.image"
          :alt="vendor.image_alt"
          class="max-w-full max-h-full w-full group-hover:scale-[105%] transition-all duration-500 ease"
        >
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vendors',
  data () {
    return {
      vendors: [
        { image_alt: 'giesecke-devrient', image: require('@/assets/images/vendors/giesecke-devrient.jpeg') },
        { image_alt: 'idedapower', image: require('@/assets/images/vendors/idedapower.jpeg') },
        { image_alt: 'kyocera', image: require('@/assets/images/vendors/kyocera.jpeg') },
        { image_alt: 'sanico', image: require('@/assets/images/vendors/sanico.jpeg') },
        { image_alt: 'shinmei', image: require('@/assets/images/vendors/shinmei.jpeg') }
      ]
    }
  }
}
</script>

<style scoped>

</style>
