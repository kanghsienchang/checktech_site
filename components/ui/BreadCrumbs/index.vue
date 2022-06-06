<template>
  <div class="breadcrumbs flex items-center space-x-2 md:space-x-3">
    <div
      v-for="(item, index) in items"
      :key="item.path"
      class="breadcrumb flex items-center space-x-2 md:space-x-3"
    >
      <component
        :is="item.path ? 'nuxt-link' : 'span'"
        :to="item.path"
        :class="[
          'flex items-center transition-colors hover:text-primary-500',
          { 'pointer-events-none text-gray-400': index === items.length - 1 }
        ]"
      >
        <font-awesome-icon
          v-if="item.icon"
          size="sm"
          :icon="item.icon"
          class="mr-2"
        />
        <span>{{ item.label }}</span>
      </component>
      <font-awesome-icon
        v-if="index !== items.length - 1"
        icon="angle-right"
        class="text-slate-400"
      />
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
