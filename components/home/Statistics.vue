<template>
  <div class="statistics">
    <div class="main-container grid-with-gap grid-cols-3 items-center">
      <div class="statistics__heading">
        <h3>We are proud of</h3>
        <h3>our works</h3>
      </div>
      <div class="statistics__content col-span-2 flex justify-between">
        <div
          v-for="stat of stats"
          :key="stat.key"
          class="flex flex-col items-center text-center"
        >
          <div class="icon mb-4" v-html="stat.icon" />
          <div class="mb-3 text-3xl font-bold">
            {{ stat.value }}{{ stat.suffix }}
          </div>
          <div class="text-main-l">{{ stat.label }}</div>
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
    const tl = this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.statistics',
          start: 'top+=300px bottom'
        }
      })
      .from('.statistics__heading', {
        duration: 0.7,
        y: 30,
        opacity: 0
      })
      .add('start')
      .from(
        '.statistics__content',
        {
          duration: 0.4,
          opacity: 0
        },
        '<+=50%'
      )

    for (const stat of this.stats) {
      const start = { val: 0 }
      const split = (stat.value + '').split('.')
      const decimals = split.length > 1 ? split[1].length : 0
      tl.to(
        start,
        {
          val: stat.value,
          duration: 2.5,
          ease: 'power1.out',
          onUpdate() {
            stat.value = this.targets()[0].val.toFixed(decimals)
          }
        },
        'start'
      )
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
      @apply fill-primary;
    }
    .lineal-stroke {
      fill: #36496d;
    }
  }
}
</style>
