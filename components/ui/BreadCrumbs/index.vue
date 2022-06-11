<template>
  <div class="breadcrumbs flex flex-wrap items-center">
    <div
      v-for="(item, index) in items"
      :key="item.path"
      class="breadcrumb flex max-w-full items-center overflow-hidden"
    >
      <font-awesome-icon
        v-if="index !== 0"
        icon="angle-right"
        class="text-slate-400"
      />
      <component
        :is="item.path ? 'nuxt-link' : 'div'"
        :to="item.path"
        :class="[
          'flex flex-1 items-center overflow-hidden px-2.5 transition-colors first:pl-0 hover:text-primary-500',
          { 'pointer-events-none text-gray-400': index === items.length - 1 }
        ]"
      >
        <font-awesome-icon
          v-if="item.icon"
          size="sm"
          :icon="item.icon"
          class="mr-2"
        />
        <span class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {{ item.label }}
        </span>
      </component>
    </div>
    <!--<template v-for="(crumb, index) in crumbs">-->
    <!--  <font-awesome-icon-->
    <!--    v-if="index !== 0"-->
    <!--    :key="crumb.path + '_slash'"-->
    <!--    icon="angle-right"-->
    <!--    class="text-slate-400"-->
    <!--  />-->
    <!--  <span-->
    <!--    :key="crumb.path"-->
    <!--    :class="[-->
    <!--      'inline-flex items-center',-->
    <!--      index !== crumbs.length - 1 &&-->
    <!--        'transition-colors hover:text-primary-500'-->
    <!--    ]"-->
    <!--  >-->
    <!--    <font-awesome-icon-->
    <!--      v-if="getMeta(crumb).icon"-->
    <!--      size="sm"-->
    <!--      class="mr-2"-->
    <!--      :icon="getMeta(crumb).icon"-->
    <!--    />-->
    <!--    <nuxt-link v-if="index !== crumbs.length - 1" :to="crumb.path || '/'">-->
    <!--      {{ getMeta(crumb).title || '' }}-->
    <!--    </nuxt-link>-->
    <!--    <span v-else class="text-slate-400">-->
    <!--      {{ getMeta(crumb).title || '' }}-->
    <!--    </span>-->
    <!--  </span>-->
    <!--</template>-->
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped></style>
