<template>
  <div
    class="product-images-card flex items-stretch rounded-md border shadow-sm"
  >
    <client-only>
      <swiper ref="swiper" :options="swiperOptions" class="w-full">
        <swiper-slide v-for="image in images || []" :key="image.src">
          <div class="flex h-full w-full items-center">
            <img
              v-lazy="image.src"
              :alt="image.alt"
              class="max-h-full w-full max-w-full"
            />
          </div>
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
        fadeEffect: { crossFade: true },
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
