<template>
  <div class="vendors main-container my-16 md:my-20">
    <h2 class="vendors__heading mb-6">{{ data.title }}</h2>
    <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
      <a
        v-for="(vendor, index) of data.items"
        :key="index"
        :href="vendor.link"
        rel="noreferrer noopener"
        target="_blank"
      >
        <figure
          class="vendors__vendor group overflow-hidden rounded-md border shadow-sm transition-all duration-200 hover:-translate-y-1"
        >
          <img v-lazy="vendor.image.src" :alt="vendor.image.alt" />
        </figure>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vendors',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
