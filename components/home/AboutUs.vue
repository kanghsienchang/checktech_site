<template>
  <div class="about-us my-16 md:my-20">
    <div class="main-container grid gap-10 md:grid-cols-2 md:gap-8 lg:gap-12">
      <div class="about-us__image relative flex space-x-4">
        <div class="flex w-1/2 flex-col space-y-4">
          <div class="ml-auto h-full w-[calc(100%-1.5rem)]">
            <img
              v-lazy="data.image_top_left.src"
              :alt="data.image_top_left.alt"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
          <div class="h-[calc(100%-1.5rem)]">
            <img
              v-lazy="data.image_bottom_left.src"
              :alt="data.image_bottom_left.alt"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
        </div>
        <div class="flex w-1/2 items-center">
          <div class="h-[calc(100%-3rem)]">
            <img
              v-lazy="data.image_right.src"
              :alt="data.image_right.alt"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
        </div>
        <div
          class="dotted-bg absolute -top-0 left-0 -z-10 h-24 w-24 -translate-y-1/4 -translate-x-1/4 bg-[length:0.75rem_0.75rem] opacity-75"
        />
        <div class="absolute inset-0 flex items-center justify-center">
          <div
            class="flex h-[9.375rem] w-[9.375rem] translate-y-6 -translate-x-3 flex-col items-center justify-center rounded-full bg-primary-500 text-white"
          >
            <div class="mb-1 text-3xl font-bold">{{ data.experience }}</div>
            <div>{{ $t('home.year_experience') }}</div>
          </div>
        </div>
      </div>
      <div
        class="about-us__content flex flex-col items-center justify-center text-center"
      >
        <h2 class="mb-3">{{ data.title_1 }}</h2>
        <h4 class="mb-6">
          {{ data.title_2 }}
        </h4>
        <p>
          {{ data.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
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
          trigger: '.about-us',
          start: 'top+=150px bottom'
        }
      })
      .from('.about-us__image', {
        opacity: 0,
        y: 30,
        duration: 0.7
      })
      .from(
        '.about-us__content',
        {
          opacity: 0,
          y: 30,
          duration: 0.7
        },
        '<+=50%'
      )
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped lang="scss">
.dotted-bg {
  background-image: radial-gradient(
    theme('colors.primary.500') 2px,
    transparent 0
  );
}
</style>
