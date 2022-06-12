<template>
  <div class="service-map mt-16 md:mt-20">
    <div class="main-container">
      <div class="service-map__heading">
        <h2 class="mb-3">{{ data.title_1 }}</h2>
        <h4 class="mb-8">{{ data.title_2 }}</h4>
      </div>
      <div class="flex flex-col gap-8 xl:flex-row xl:gap-12">
        <div class="service-map__map w-full flex-1 xl:w-2/3">
          <lottie-wrapper :options="mapAnimationOptions" />
        </div>
        <div class="service-map__legend flex-shrink-0">
          <div
            class="grid auto-rows-min grid-cols-2 gap-4 rounded-md border border-primary-200 bg-slate-50 px-6 py-8 xl:gap-6"
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
                class="relative mr-2 h-6 w-6 flex-shrink-0 rounded-full border"
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
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
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
          label: this.$t('service_map.countries.taiwan'),
          dotColor: '#4056A4'
        },
        {
          key: 'america',
          label: this.$t('service_map.countries.america'),
          dotColor: '#6599F8'
        },
        {
          key: 'japan',
          label: this.$t('service_map.countries.japan'),
          dotColor: '#6599F8'
        },
        {
          key: 'brazil',
          label: this.$t('service_map.countries.brazil'),
          dotColor: '#6599F8'
        },
        {
          key: 'singapore',
          label: this.$t('service_map.countries.singapore'),
          dotColor: '#6599F8'
        },
        {
          key: 'holland',
          label: this.$t('service_map.countries.holland'),
          dotColor: '#6599F8'
        },
        {
          key: 'malaysia',
          label: this.$t('service_map.countries.malaysia'),
          dotColor: '#6599F8'
        },
        {
          key: 'china',
          label: this.$t('service_map.countries.china'),
          dotColor: '#6599F8'
        },
        {
          key: 'vietnam',
          label: this.$t('service_map.countries.vietnam'),
          dotColor: '#6599F8'
        },
        {
          key: 'hongkong',
          label: this.$t('service_map.countries.hongkong'),
          dotColor: '#6599F8'
        },
        {
          key: 'indonesia',
          label: this.$t('service_map.countries.indonesia'),
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
          start: 'top+=200px bottom'
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
