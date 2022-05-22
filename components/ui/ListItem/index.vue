<template>
  <li class="relative flex items-center py-1">
    <span class="absolute -left-5">
      <slot name="icon">
        <span
          v-if="type === 'check'"
          class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-100"
        >
          <font-awesome-icon icon="check" size="xs" class="text-primary-500" />
        </span>
      </slot>
    </span>
    <span class="ml-2">
      <slot></slot>
    </span>
  </li>
</template>

<script>
export default {
  name: 'ListItem',
  inject: ['list'],
  computed: {
    type() {
      return this.list.type
    }
  }
}
</script>

<style scoped></style>
