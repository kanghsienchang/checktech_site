<template>
  <div class="statistics">
    <div class="main-container grid-with-gap grid-cols-3 items-center">
      <div>
        <h3>We are proud of</h3>
        <h3>our works</h3>
      </div>
      <div class="col-span-2 flex justify-between">
        <div
          v-for="stat of stats"
          :key="stat.key"
          class="flex flex-col items-center text-center"
        >
          <div class="icon mb-4" v-html="stat.icon" />
          <div class="mb-3 text-3xl font-bold">{{ stat.value }}</div>
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
          value: '75.13M',
          label: 'Average Capacity'
        },
        {
          key: 'operation_rate',
          icon: require('@/assets/images/icons/profits.svg?raw'),
          value: '85%',
          label: 'Operation Rate'
        },
        {
          key: 'expert_employees',
          icon: require('@/assets/images/icons/group-2.svg?raw'),
          value: '550',
          label: 'Expert Employees'
        }
      ]
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
