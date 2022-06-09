<template>
  <div class="product-categories mt-16 md:mt-20">
    <div class="main-container">
      <div class="product-categories__heading">
        <h2 class="mb-3">{{ data.title_1 }}</h2>
        <h4 class="mb-6">{{ data.title_2 }}</h4>
      </div>
      <div class="grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
        <nuxt-link
          v-for="(category, index) of data.items"
          :key="index"
          :to="category.link"
          class="category group relative block flex h-[20rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md bg-cover bg-no-repeat p-8 text-white"
        >
          <div
            v-lazy:background-image="category.background.src"
            class="bg-image-overlay-50 absolute inset-0 -z-10 bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-[1.025]"
          />
          <div class="flex flex-col gap-4">
            <div class="text-2xl font-medium">
              {{ category.title }}
            </div>
            <div>
              {{ category.description }}
            </div>
            <div class="underline">{{ $t('common.view_more') }}</div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCategories',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      animation: null
    }
  },
  mounted() {
    this.animation = this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.product-categories',
          start: 'top+=300px bottom'
        }
      })
      .from('.product-categories__heading', {
        duration: 0.4,
        opacity: 0,
        y: 30
      })
      .from('.category', { opacity: 0, duration: 0.7, y: 30, stagger: 0.25 })
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped></style>
