<template>
  <div ref="lottieContainer" class="lottie-wrapper"></div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: 'LottieWrapper',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      animation: null
    }
  },
  mounted() {
    this.animation = lottie.loadAnimation({
      container: this.$refs.lottieContainer,
      renderer: 'svg',
      ...this.options
    })
    this.$emit('animation-created', this.animation)
  },
  beforeDestroy() {
    lottie.destroy(this.animation)
  }
}
</script>

<style lang="scss" scoped></style>
