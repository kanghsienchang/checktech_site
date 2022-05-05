<template>
  <li class="py-1 relative flex items-center">
    <span v-if="type === 'check'" class="absolute -left-5 bg-primary-l h-5 w-5 inline-flex rounded-full items-center justify-center">
      <font-awesome-icon icon="check" size="xs" class="text-primary" />
    </span>
    <span class="ml-1.5">
      <slot></slot>
    </span>
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  inject: ['list'],
  computed: {
    type () {
      return this.list.type
    }
  }
}
</script>

<style scoped>

</style>
