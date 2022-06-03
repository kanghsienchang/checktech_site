<template>
  <ul class="list ml-5">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'CList',
  provide() {
    return {
      list: this
    }
  },
  props: {
    type: {
      type: String,
      default: '',
      validator: (value) => {
        // yet to implement bullet and arrow
        return ['check', 'bullet', ''].includes(value)
      }
    }
  }
}
</script>

<style scoped></style>
