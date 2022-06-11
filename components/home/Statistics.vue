<template>
  <div class="statistics bg-slate-50 py-16 md:py-20">
    <div
      class="main-container grid items-center gap-10 md:grid-cols-3 md:gap-12"
    >
      <div class="statistics__heading text-center md:text-left">
        <h3 class="whitespace-pre-wrap" v-text="data.title" />
      </div>
      <div
        class="statistics__content justify-between space-y-10 md:col-span-2 md:flex md:space-y-0 md:space-x-12"
      >
        <div
          v-for="(stat, index) of data.items"
          :key="index"
          class="flex flex-col items-center text-center"
        >
          <!--eslint-disable vue/no-v-html-->
          <div
            class="icon mb-4"
            v-html="require(`@/assets/icons/${stat.icon}.svg?raw`)"
          />
          <div class="mb-2 text-3xl font-bold">
            {{ (statValues[index] && statValues[index].value) || stat.value
            }}{{ stat.suffix }}
          </div>
          <div class="text-slate-800-l">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Statistics',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      animations: [],
      statValues: []
    }
  },
  mounted() {
    this.statValues = this.data.items.map((item) => ({
      value: item.value
    }))
    for (const stat of this.statValues) {
      const start = { val: 0 }
      const split = (stat.value + '').split('.')
      const decimals = split.length > 1 ? split[1].length : 0
      const self = this
      const animation = this.$gsap.to(start, {
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.statistics',
          start: 'top+=200px bottom'
        },
        val: stat.value,
        duration: 1.5,
        ease: 'power1.out',
        onUpdate() {
          self.$set(stat, 'value', this.targets()[0].val.toFixed(decimals))
        }
      })
      this.animations.push(animation)
    }
  },
  beforeDestroy() {
    for (const animation of this.animations) {
      animation.kill()
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
  &::v-deep {
    svg {
      @apply h-12 w-12;
    }
    .lineal-fill {
      @apply fill-primary-500;
    }
    .lineal-stroke {
      fill: theme('colors.slate.700');
    }
  }
}
</style>
