<template>
  <div
    class="features relative -mt-7 overflow-hidden bg-slate-50 pt-24 pb-16 md:pb-20 md:pt-28"
  >
    <div
      class="absolute top-0 right-0 h-8 w-32 translate-y-2 -skew-y-2 -skew-x-2 bg-cyan-200/70 md:w-60"
    />
    <div
      class="absolute top-0 right-0 h-6 w-24 translate-y-7 -translate-x-2 -skew-y-1 -skew-x-2 bg-blue-400/70 md:w-52"
    />
    <div
      class="main-container flex flex-col justify-between space-y-10 md:flex-row md:space-y-0 md:space-x-10"
    >
      <div
        v-for="(feature, index) in data.items"
        :key="index"
        class="features__feature flex flex-col space-y-4 md:w-52"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-md bg-primary-100"
        >
          <font-awesome-icon
            :icon="feature.icon"
            class="text-primary-500"
            size="xl"
          />
        </div>
        <h5>{{ feature.title }}</h5>
        <p>
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Features',
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
          trigger: '.features',
          start: 'top+=200px bottom'
        }
      })
      .from('.features__feature', {
        duration: 0.4,
        opacity: 0,
        x: 30,
        stagger: 0.25
      })
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped></style>
