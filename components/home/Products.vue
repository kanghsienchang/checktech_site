<template>
  <section class="products main-container">
    <h2>產品分類</h2>
    <swiper ref="mySwiper" class="mt-8" :options="swiperOptions">
      <swiper-slide v-for="product of products" :key="product.key">
        <div class="relative border rounded-md flex flex-col h-full overflow-hidden shadow-sm">
          <figure class="h-48 md:h-60 border-b bg-gray-50 flex justify-center items-center">
            <img
              :src="product.image"
              :alt="product.title"
              class="max-w-full max-h-full h-full object-cover p-6 lg:p-8"
            >
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
          <div class="flex-1 flex flex-col p-6 gap-4">
            <h4>{{ product.title }}</h4>
            <p class="flex-1">
              {{ product.description || 'asd' }}
            </p>
            <c-button class="mt-2">
              了解更多
            </c-button>
          </div>
        </div>
        <!--<div class="flex flex-col border shadow rounded-md overflow-hidden bg-white">-->
        <!--  <figure class="h-1/2 flex-shrink-0 bg-gray-100 flex justify-center items-center rounded-sm">-->
        <!--    <img-->
        <!--      :src="product.image"-->
        <!--      class="max-w-full max-h-full h-full"-->
        <!--      alt=""-->
        <!--    >-->
        <!--  </figure>-->
        <!--  <div class="flex-1 p-6 flex flex-col gap-2">-->
        <!--    <h4>-->
        <!--      {{ product.title }}-->
        <!--    </h4>-->
        <!--    <p class="flex-grow">-->
        <!--      {{ product.description }}-->
        <!--    </p>-->
        <!--    <c-button>Learn More</c-button>-->
        <!--    &lt;!&ndash;<div class="text-right">&ndash;&gt;-->
        <!--    &lt;!&ndash;  <a class="text-primary text-base">&ndash;&gt;-->
        <!--    &lt;!&ndash;    Learn More <font-awesome-icon icon="caret-right" size="sm"></font-awesome-icon>&ndash;&gt;-->
        <!--    &lt;!&ndash;  </a>&ndash;&gt;-->
        <!--    &lt;!&ndash;</div>&ndash;&gt;-->
        <!--  </div>-->
        <!--</div>-->
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination"></div>
    </swiper>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
import defaultTheme from 'tailwindcss/defaultTheme'
import CButton from '~/components/ui/Button'
export default {
  name: 'Products',
  components: { CButton, SwiperSlide, Swiper },
  data () {
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
          description: '電子連接器，是連接電氣線路的一種導體設備。它廣泛地應用於各種電氣線路',
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
    ...mapGetters(['platform']),
    swiperOptions () {
      return {
        slidesPerView: 1.15,
        spaceBetween: 24,
        cssMode: this.platform === 'mobile',
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
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  methods: {
    removePx (breakpointInpX) {
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
