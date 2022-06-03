<template>
  <div class="c-tabs flex overflow-x-auto overflow-y-hidden">
    <div
      class="mb-[2px] flex flex-1 items-center border-b-[2px] border-slate-200"
    >
      <div
        v-for="item in items"
        :key="item.value"
        class="'c-tab-pane -mb-[2px] cursor-pointer px-2 first:pl-0"
        @click="$emit('input', item.value)"
      >
        <div
          :class="[
            'whitespace-nowrap border-b-2 border-transparent px-2 py-1.5 transition-colors',
            {
              'border-primary-500 text-primary-500': item.value === value
            }
          ]"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CTabs',
  props: {
    value: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped></style>
