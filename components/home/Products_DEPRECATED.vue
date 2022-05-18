<template>
  <section class="products main-container">
    <h2 class="mb-2">產品分類</h2>
    <h3>提供客戶一次購足服務</h3>
    <swiper ref="mySwiper" class="mt-8" :options="swiperOptions">
      <swiper-slide v-for="product of products" :key="product.key">
        <div
          class="relative flex h-full flex-col overflow-hidden rounded-md border shadow-sm"
        >
          <figure
            class="flex h-48 items-center justify-center border-b bg-gray-50 md:h-60"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="h-full max-h-full max-w-full object-cover p-6 lg:p-8"
            />
          </figure>
          <!--<div>-->
          <!--  <a class="relative border-b bg-gray-50 flex justify-center items-center w-full pt-[100%]">-->
          <!--    <div class="w-full h-full absolute left-0 top-0 flex items-center justify-center">-->
          <!--      <img-->
          <!--        :src="product.image"-->
          <!--        :alt="product.title"-->
          <!--        class="max-w-full max-h-full"-->
          <!--      >-->
          <!--    </div>-->
          <!--  </a>-->
          <!--</div>-->
          <div class="flex flex-1 flex-col gap-4 p-6">
            <h4>{{ product.title }}</h4>
            <p class="flex-1">
              {{ product.description }}
            </p>
            <c-button class="mt-2"> 了解更多 </c-button>
          </div>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination"></div>
    </swiper>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
import defaultTheme from 'tailwindcss/defaultTheme'
import CButton from '~/components/ui/Button'
export default {
  name: 'Products',
  components: { CButton, SwiperSlide, Swiper },
  data() {
    return {
      products: [
        {
          key: 1,
          title: '耳機插頭',
          description: '專業連接器,耳機插座工廠 尺寸規格齊全,歡迎洽詢訂購',
          image: require('@/assets/images/product-1.png')
        },
        {
          key: 2,
          title: '連接器',
          description:
            '電子連接器，是連接電氣線路的一種導體設備。它廣泛地應用於各種電氣線路',
          image: require('@/assets/images/product-2.png')
        },
        {
          key: 3,
          title: '開關',
          description: '',
          image: require('@/assets/images/product-3.png')
        }
      ]
    }
  },
  computed: {
    swiperOptions() {
      return {
        slidesPerView: 1.15,
        spaceBetween: 24,
        cssMode: this.$device.isMobile,
        pagination: {
          el: '.swiper-pagination'
        },
        breakpoints: {
          [this.removePx(defaultTheme.screens.sm)]: {
            slidesPerView: 2.15
          },
          [this.removePx(defaultTheme.screens.lg)]: {
            slidesPerView: 3
          }
        }
      }
    },
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    removePx(breakpointInpX) {
      return breakpointInpX.replace('px', '')
    }
  }
}
</script>

<style scoped lang="scss">
.swiper-slide {
  height: auto;
}
</style>
