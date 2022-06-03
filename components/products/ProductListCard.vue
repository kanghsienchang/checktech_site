<template>
  <nuxt-link
    :to="link"
    class="product-list-card flex flex-col rounded border p-4 shadow-sm"
  >
    <div class="mb-4 flex-1 overflow-hidden rounded-md">
      <img :src="imageSrc" :alt="imageAlt" class="h-full w-full object-cover" />
    </div>
    <div class="text-center">
      {{ name }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ProductListCard',
  props: {
    imageSrc: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
