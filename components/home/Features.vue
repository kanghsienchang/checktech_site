<template>
  <div class="features main-container grid md:grid-cols-2 lg:grid-cols-4 gap-10">
    <div
      v-for="feature of features"
      :key="feature.key"
      class="flex flex-col items-center gap-3"
    >
      <div class="bg-primary rounded-full flex justify-center items-center h-14 w-14">
        <font-awesome-icon :icon="feature.icon" class="text-white" size="lg" />
      </div>
      <h4>{{ feature.label }}</h4>
      <p class="text-center">
        {{ feature.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Features',
  data () {
    return {
      features: [
        { key: 'fast_response', label: '回覆迅速', icon: 'business-time', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
        { key: 'flexible_shipping', label: '彈性出貨', icon: 'truck', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
        { key: 'legit_warranty', label: '合理保固', icon: 'clipboard-check', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
        { key: 'from_the_heart', label: '從心出發', icon: 'hand-holding-heart', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
