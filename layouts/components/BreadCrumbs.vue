<template>
  <div class="breadcrumbs flex items-center space-x-2 md:space-x-3">
    <template v-for="(crumb, index) in crumbs">
      <font-awesome-icon
        v-if="index !== 0"
        :key="crumb.path + '_slash'"
        icon="angle-right"
        class="text-slate-400"
      />
      <span
        :key="crumb.path"
        :class="[
          'inline-flex items-center',
          index !== crumbs.length - 1 &&
            'transition-colors hover:text-primary-500'
        ]"
      >
        <font-awesome-icon
          v-if="getMeta(crumb).icon"
          size="sm"
          class="mr-2"
          :icon="getMeta(crumb).icon"
        />
        <nuxt-link v-if="index !== crumbs.length - 1" :to="crumb.path || '/'">
          {{ getMeta(crumb).title || '' }}
        </nuxt-link>
        <span v-else class="text-slate-400">
          {{ getMeta(crumb).title || '' }}
        </span>
      </span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.substring(1).split('/')
      const crumbs = [this.$router.getRoutes()[0]] // home page

      let path = ''

      params.forEach((param, index) => {
        path = `${path}/${param}`
        const match = this.$router.match(path)

        if (match.name !== null) {
          crumbs.push(match)
        }
      })

      return crumbs
    }
  },
  methods: {
    getMeta(route) {
      return route?.meta
    }
  }
}
</script>

<style scoped></style>
