<template>
  <div class="breadcrumbs">
    <pre>{{ $route.meta }}</pre>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath
      const params = fullPath.substring(1).split('/')
      const crumbs = []

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
  }
}
</script>

<style scoped></style>
