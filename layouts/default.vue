<template>
  <div
    :key="$i18n.locale"
    class="default-layout flex min-h-[calc(var(--vh-unit,1vh)*100)] flex-col"
  >
    <nav-menu
      ref="navMenu"
      :on-transparent-bg="isHomePage"
      :show-contact-us="isHomePage"
      :product-categories="productCategories"
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
import { getProductCategories } from '~/api/products'
export default {
  name: 'DefaultLayout',
  components: { AppFooter, NavMenu },
  data() {
    return {
      resizeFunction: null,
      rawProductCategories: []
    }
  },
  async fetch() {
    await this.getProductCategories()
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      titleTemplate: (title) => {
        return title
          ? `${title} | ${this.$t('meta.title')}`
          : this.$t('meta.title')
      },
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'website' },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('meta.title')
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('meta.description')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('meta.description')
        },
        { hid: 'twitter:site', name: 'twitter:site', content: this.fullUrl },
        { hid: 'og:url', property: 'og:url', content: this.fullUrl },
        {
          hid: 'og:image',
          property: 'og:image',
          content: require('@/assets/images/logo.png')
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: require('@/assets/images/logo.png')
        },
        ...i18nHead.meta
      ],
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.fullUrl
        },
        ...i18nHead.link
      ]
    }
  },
  computed: {
    fullUrl() {
      return `${process.env.NUXT_WEB_BASE_URL}${this.$route.fullPath}`
    },
    isHomePage() {
      return this.localePath('index') === this.$route.path
    },
    scrollTriggerOptions() {
      if (!this.isHomePage) {
        return {
          trigger: '.nav-menu',
          start: 'bottom top'
        }
      }
      return {
        trigger: '.nav-menu',
        start: () => `${Math.ceil(window.innerHeight * 0.7)} top`
      }
    },
    productCategories() {
      return this.rawProductCategories.map((category) => {
        return {
          name: this.$_get(
            category,
            `attributes.name.${this.$i18n.localeProperties.dataKey}`
          ),
          key: this.$_get(category, 'attributes.key')
        }
      })
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
    },
    async getProductCategories() {
      const { data } = await getProductCategories(this.$axios, {
        populate: ['name'],
        sort: ['id:desc']
      })
      this.rawProductCategories = data
    }
  }
}
</script>

<style scoped lang="scss"></style>
