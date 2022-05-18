<template>
  <div class="service-map">
    <div class="main-container">
      <h2 class="mb-6">客戶分佈</h2>
      <div class="grid-with-gap grid-cols-4">
        <lottie-wrapper class="col-span-3" :options="mapAnimationOptions" />
        <div>
          <div
            class="grid auto-rows-min grid-cols-2 gap-6 rounded-md border border-primary-l bg-light px-6 py-8"
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
  }
}
</script>

<style scoped></style>
