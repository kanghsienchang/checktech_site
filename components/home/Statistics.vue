<template>
  <div class="statistics bg-slate-50 py-16 md:py-20">
    <div class="main-container grid items-center gap-10 md:grid-cols-3">
      <div class="statistics__heading text-center md:text-left">
        <h3>We are proud of</h3>
        <h3>our works</h3>
      </div>
      <div
        class="statistics__content justify-between space-y-10 md:col-span-2 md:flex md:space-y-0 md:space-x-12"
      >
        <div
          v-for="stat of stats"
          :key="stat.key"
          class="flex flex-col items-center text-center"
        >
          <!--eslint-disable-next-line vue/no-v-html-->
          <div class="icon mb-4" v-html="stat.icon" />
          <div class="mb-2 text-3xl font-bold">
            {{ stat.value }}{{ stat.suffix }}
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
  data() {
    return {
      animations: [],
      stats: [
        {
          key: 'average_capacity',
          icon: require('@/assets/images/icons/analytics.svg?raw'),
          value: 75.13,
          suffix: 'M',
          label: 'Average Capacity'
        },
        {
          key: 'operation_rate',
          icon: require('@/assets/images/icons/profits.svg?raw'),
          value: 85,
          suffix: '%',
          label: 'Operation Rate'
        },
        {
          key: 'expert_employees',
          icon: require('@/assets/images/icons/group-2.svg?raw'),
          value: 550,
          suffix: '',
          label: 'Expert Employees'
        }
      ]
    }
  },
  mounted() {
    for (const stat of this.stats) {
      const start = { val: 0 }
      const split = (stat.value + '').split('.')
      const decimals = split.length > 1 ? split[1].length : 0
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
          stat.value = this.targets()[0].val.toFixed(decimals)
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
