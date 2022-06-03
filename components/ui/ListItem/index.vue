<template>
  <li class="relative flex items-center py-1">
    <span class="absolute -left-5">
      <slot name="icon">
        <div class="flex h-4 w-4 items-center justify-center">
          <span
            v-if="type === 'check'"
            class="flex h-4 w-4 items-center justify-center rounded-full bg-primary-100"
          >
            <font-awesome-icon
              icon="check"
              size="2xs"
              class="text-primary-500"
            />
          </span>
          <font-awesome-icon
            v-if="type === 'bullet'"
            icon="circle"
            size="2xs"
            class="text-xs text-primary-500"
          />
        </div>
      </slot>
    </span>
    <span class="ml-1">
      <slot></slot>
    </span>
  </li>
</template>

<script>
export default {
  name: 'CListItem',
  inject: ['list'],
  computed: {
    type() {
      return this.list.type
    }
  }
}
</script>

<style scoped></style>
