<template>
  <section class="products main-container">
    <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 xl:gap-12">
      <div
        v-for="product of products"
        :key="product.key"
        class="flex flex-col border shadow-md rounded-md overflow-hidden bg-white"
      >
        <figure class="h-1/2 flex-shrink-0 bg-gray-100 flex justify-center items-center rounded-sm">
          <img
            :src="product.image"
            class="max-w-full max-h-full h-full"
            alt=""
          >
        </figure>
        <div class="flex-1 p-6 flex flex-col gap-2">
          <h3>
            {{ product.title }}
          </h3>
          <p class="flex-1">
            {{ product.description }}
          </p>
          <c-button>Learn More</c-button>
          <!--<div class="text-right">-->
          <!--  <a class="text-primary text-base">-->
          <!--    Learn More <font-awesome-icon icon="caret-right" size="sm"></font-awesome-icon>-->
          <!--  </a>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CButton from '~/components/ui/Button'
export default {
  name: 'Products',
  components: { CButton },
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
  }
}
</script>

<style scoped lang="scss">
</style>
