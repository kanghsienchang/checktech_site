<template>
  <div>
    <pre>{{ data }}</pre>
  </div>
</template>

<script>
import { getProducts } from '~/api/products'
export default {
  name: 'Test',
  data() {
    return {
      data: []
    }
  },
  async fetch() {
    const { data } = await getProducts(this.$axios, {
      populate: '*'
    })
    this.data = data
  }
}
</script>

<style scoped></style>
