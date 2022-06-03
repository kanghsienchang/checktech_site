<template>
  <div
    :key="$i18n.locale"
    class="default-layout flex min-h-[calc(var(--vh-unit,1vh)*100)] flex-col"
  >
    <nav-menu
      :key="$route.path"
      ref="navMenu"
      :transparent-and-absolute-at-top="isHomePage"
      :scroll-trigger-options="scrollTriggerOptions"
    />
    <div :class="['content-wrapper flex-1', { 'mt-16': !isHomePage }]">
      <nuxt-child />
    </div>
    <app-footer ref="footer" />
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
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: this.$t('meta.title'),
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        { hid: 'og-type', property: 'og:type', content: 'website' },
        { hid: 'og-title', property: 'og:title', content: '大將科技' },
        { hid: 'og-desc', property: 'og:description', content: '測試大將官網' },
        {
          hid: 'og-image',
          property: 'og:image',
          content: require('@/assets/images/logo.png')
        },
        ...i18nHead.meta
      ],
      link: [...i18nHead.link]
    }
  },
  computed: {
    isHomePage() {
      return this.localePath('index') === this.$route.path
    },
    scrollTriggerOptions() {
      if (!this.isHomePage) {
        return {
          trigger: '.nav-wrapper',
          start: 'bottom top'
        }
      }
      return {
        trigger: '#home-header',
        start: '70% top'
      }
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
      }, 100)
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

<style scoped lang="scss"></style>
