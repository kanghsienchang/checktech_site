<template>
  <li class="list-item pb-4 last:pb-0">
    <span v-if="type === 'check'" class="bg-primary-l h-5 w-5 inline-flex rounded-full items-center justify-center">
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
