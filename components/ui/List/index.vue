<template>
  <ul class="list">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'List',
  provide () {
    return {
      list: this
    }
  },
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => {
        // yet to implement bullet and arrow
        return ['check'].includes(value)
      }
    }

  }
}
</script>

<style scoped>

</style>
