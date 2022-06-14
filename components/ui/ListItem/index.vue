<template>
  <li class="relative flex">
    <div class="absolute top-0 left-0 h-4 w-4">
      <slot name="icon">
        <span
          v-if="type === 'check'"
          class="inline-flex h-full w-full items-center justify-center rounded-full bg-primary-100"
        >
          <font-awesome-icon icon="check" size="2xs" class="text-primary-500" />
        </span>
        <font-awesome-icon
          v-if="type === 'bullet'"
          icon="circle"
          class="scale-50 text-slate-900"
        />
      </slot>
    </div>
    <span class="pl-6">
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
