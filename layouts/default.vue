<template>
  <div class="default-layout">
    <nav-menu />
    <div class="content-wrapper">
      <nuxt-child />
    </div>
    <app-footer />
  </div>
</template>

<script>
import NavMenu from '~/layouts/components/NavMenu'
import AppFooter from '~/layouts/components/AppFooter'
export default {
  name: 'DefaultLayout',
  components: { AppFooter, NavMenu },
  data() {
    return {
      resizeFunction: null
    }
  },
  head() {
    return {
      meta: [
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: '大將科技' },
        { hid: 'og-desc', property: 'og:description', content: '測試大將官網' },
        {
          hid: 'og-image',
          property: 'og:image',
          content: require('@/assets/images/logo.png')
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeHandler)
    this.resize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
    clearTimeout(this.resizeFunction)
  },
  methods: {
    resizeHandler() {
      clearTimeout(this.resizeFunction)
      this.resizeFunction = setTimeout(() => {
        this.resize()
      }, 300)
    },
    resize() {
      this.$store.commit('setWindowWidth', window.innerWidth)
      this.$store.commit('setWindowHeight', window.innerHeight)
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh-unit', `${vh}px`)
    }
  }
}
</script>

<style scoped></style>
