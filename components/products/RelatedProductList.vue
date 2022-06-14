<template>
  <div class="related-product-list relative flex items-stretch">
    <client-only>
      <swiper ref="swiper" class="w-full" :options="swiperOptions">
        <swiper-slide
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.key"
        >
          <product-list-card
            class="h-full"
            :link="localePath(`/products/${relatedProduct.key}`)"
            :image-alt="relatedProduct.image.alt"
            :image-src="relatedProduct.image.src"
            :name="relatedProduct.name"
          />
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </client-only>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductListCard from '~/components/products/ProductListCard'
export default {
  name: 'RelatedProductList',
  components: { ProductListCard },
  props: {
    relatedProducts: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(['breakpoints']),
    swiperOptions() {
      return {
        spaceBetween: 16,
        slidesPerView: 1.4,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        cssMode: this.$device.isMobileOrTablet,
        breakpoints: {
          [this.breakpoints.sm]: {
            slidesPerView: 2.4,
            spaceBetween: 24
          },
          [this.breakpoints.lg]: {
            slidesPerView: 3.4,
            spaceBetween: 24
          },
          [this.breakpoints.xl]: {
            slidesPerView: 4.4,
            spaceBetween: 24
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.related-product-list {
  .swiper-button-prev,
  .swiper-button-next {
    @apply hidden h-12 w-12 rounded-full bg-white opacity-95 shadow-md md:flex;
    &:after {
      @apply text-base text-slate-800;
    }
    &.swiper-button-disabled {
      @apply opacity-[0.35];
    }
  }

  .swiper-button-next {
    @apply right-0 translate-x-1/2;
  }
  .swiper-button-prev {
    @apply left-0 -translate-x-1/2;
  }
}
</style>
