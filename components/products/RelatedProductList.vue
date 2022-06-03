<template>
  <div class="flex items-stretch">
    <client-only>
      <swiper class="w-full" :options="swiperOptions">
        <swiper-slide
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.key"
        >
          <product-list-card
            :link="localePath(`/products/${relatedProduct.key}`)"
            :image-alt="relatedProduct.image.alt"
            :image-src="relatedProduct.image.src"
            :name="relatedProduct.name"
          />
        </swiper-slide>
      </swiper>
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
        spaceBetween: 32,
        slidesPerView: 2.15,
        watchOverflow: true,
        observer: true,
        observeParents: true,
        breakpoints: {
          [this.breakpoints.md]: {
            slidesPerView: 3.15
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
