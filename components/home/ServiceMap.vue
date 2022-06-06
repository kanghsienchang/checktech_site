<template>
  <div class="service-map mt-16 md:mt-20">
    <div class="main-container">
      <div class="service-map__heading">
        <h2 class="mb-3">客戶分佈</h2>
        <h4 class="mb-8">銷售據點涵蓋亞洲、歐洲及美洲</h4>
      </div>
      <div class="grid gap-8 md:grid-cols-4 md:gap-12">
        <div class="service-map__map md:col-span-3">
          <lottie-wrapper :options="mapAnimationOptions" />
        </div>
        <div class="service-map__legend">
          <div
            class="grid auto-rows-min grid-cols-2 gap-4 md:gap-6 md:rounded-md md:border md:border-primary-200 md:bg-slate-50 md:px-6 md:py-8"
          >
            <div
              v-for="country of legendCountries"
              :key="country.key"
              :class="[
                'flex items-center',
                { 'col-span-2': country.key === 'taiwan' }
              ]"
            >
              <div
                class="relative mr-2 h-6 w-6 rounded-full border"
                :style="{ borderColor: country.dotColor }"
              >
                <div
                  class="absolute top-1/2 left-1/2 h-4 w-4 -translate-y-1/2 -translate-x-1/2 rounded-full"
                  :style="{ backgroundColor: country.dotColor }"
                />
              </div>
              <span>
                {{ country.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LottieWrapper from '~/components/ui/LottieWrapper'
import map from '~/assets/animations/map_v1.json'
export default {
  name: 'ServiceMap',
  components: { LottieWrapper },
  data() {
    return {
      animation: null,
      mapAnimationOptions: {
        animationData: map,
        autoplay: true
      },
      legendCountries: [
        {
          key: 'taiwan',
          label: '台灣',
          dotColor: '#4056A4'
        },
        {
          key: 'america',
          label: '美國',
          dotColor: '#6599F8'
        },
        {
          key: 'japan',
          label: '日本',
          dotColor: '#6599F8'
        },
        {
          key: 'brazil',
          label: '巴西',
          dotColor: '#6599F8'
        },
        {
          key: 'singapore',
          label: '新加坡',
          dotColor: '#6599F8'
        },
        {
          key: 'holland',
          label: '荷蘭',
          dotColor: '#6599F8'
        },
        {
          key: 'malaysia',
          label: '馬來西亞',
          dotColor: '#6599F8'
        },
        {
          key: 'china',
          label: '中國',
          dotColor: '#6599F8'
        },
        {
          key: 'vietnam',
          label: '越南',
          dotColor: '#6599F8'
        },
        {
          key: 'hongkong',
          label: '香港',
          dotColor: '#6599F8'
        },
        {
          key: 'indonesia',
          label: '印尼',
          dotColor: '#6599F8'
        }
      ]
    }
  },
  mounted() {
    this.animation = this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.service-map',
          start: 'top+=300px bottom'
        }
      })
      .from('.service-map__heading', { opacity: 0, duration: 0.7, y: 30 })
      .from('.service-map__map', { opacity: 0, duration: 0.7, y: 30 }, '<+=50%')
      .from(
        '.service-map__legend',
        { opacity: 0, duration: 0.7, y: 30 },
        '<+=50%'
      )
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped></style>
