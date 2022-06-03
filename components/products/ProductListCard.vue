<template>
  <nuxt-link
    :to="link"
    class="product-list-card group flex flex-col overflow-hidden rounded-md border shadow-sm"
  >
    <div class="relative mb-3 w-full overflow-hidden pb-[80%]">
      <div class="absolute inset-0">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[102%]"
        />
      </div>
    </div>
    <div class="px-3 pb-3 text-center">
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
