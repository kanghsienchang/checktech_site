<template>
  <div
    class="product-images-card flex items-stretch rounded-md border shadow-sm"
  >
    <client-only>
      <swiper ref="swiper" :options="swiperOptions" class="w-full">
        <swiper-slide
          v-for="image in images || []"
          :key="image.src"
          class="flex items-center"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            class="max-h-full max-w-full"
          />
        </swiper-slide>
        <div
          slot="pagination"
          class="swiper-pagination absolute !left-auto right-2 bottom-2 !w-auto rounded bg-slate-400 px-3 py-1.5 text-left text-xs text-white opacity-75"
        />
      </swiper>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'ProductImagesCard',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    swiperOptions() {
      return {
        effect: 'fade',
        autoplay: {
          delay: 5000
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        watchOverflow: true,
        observer: true,
        observeParents: true
      }
    }
  }
}
</script>

<style scoped></style>
