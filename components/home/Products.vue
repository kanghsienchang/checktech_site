<template>
  <div class="products mt-16 md:mt-20">
    <div class="main-container">
      <div class="products__heading">
        <h2 class="mb-3">產品分類</h2>
        <h4 class="mb-6">提供客戶一次購足服務</h4>
      </div>
      <div class="grid gap-10 md:grid-cols-3 md:gap-12">
        <div
          v-for="category of categories"
          :key="category.key"
          class="category group relative block flex h-[20rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md bg-cover bg-no-repeat p-8 text-white"
        >
          <div
            class="absolute inset-0 -z-10 bg-cover bg-no-repeat transition-transform duration-500 group-hover:scale-[1.025]"
            :style="{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.image})`
            }"
          />
          <div class="flex flex-col gap-4">
            <div class="text-2xl font-medium">
              {{ category.label }}
            </div>
            <div>
              {{ category.description }}
            </div>
            <div class="underline">查看更多</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      animation: null,
      categories: [
        {
          key: 'connectors',
          label: '連接器',
          description:
            '牢靠耐用是您想要的，我們可以為您把關，提供穩定高效的元件',
          image: require('@/assets/images/products/connectors.jpeg'),
          link: '/products/1'
        },
        {
          key: 'switches',
          label: '開關',
          description:
            '控制類的零件，是我們的強項，為您提供多元的選擇如開關的自由',
          image: require('@/assets/images/products/switches.jpg'),
          link: '/products/2'
        },
        {
          key: 'wires',
          label: '線材',
          description:
            '提供符合各項規範，且安全的連接線材，是我們的基本服務與精神',
          image: require('@/assets/images/products/wires.jpeg'),
          link: '/products/3'
        }
      ]
    }
  },
  mounted() {
    this.animation = this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.products',
          start: 'top+=300px bottom'
        }
      })
      .from('.products__heading', {
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
