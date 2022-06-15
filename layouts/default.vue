<template>
  <div :key="$i18n.locale" class="default-layout flex min-h-[100vh] flex-col">
    <nav-menu
      ref="navMenu"
      :on-transparent-bg="isHomePage"
      :show-contact-us="isHomePage"
      :product-categories="productCategories"
      :scroll-trigger-options="scrollTriggerOptions"
    />
    <div :class="['content-wrapper flex flex-1', { 'mt-16': !isHomePage }]">
      <nuxt />
    </div>
    <app-footer ref="footer" :socials="socials" />
    <affix-items v-if="socials.length" :socials="socials" />
    <client-only>
      <app-cookie />
    </client-only>
  </div>
</template>

<script>
import NavMenu from '~/layouts/components/NavMenu'
import AppFooter from '~/layouts/components/AppFooter'
import { getProductCategories } from '~/api/products'
import { getSocials } from '~/api/socials'
import AffixItems from '~/layouts/components/AffixItems'
import AppCookie from '~/layouts/components/AppCookie'
export default {
  name: 'DefaultLayout',
  components: { AppCookie, AffixItems, AppFooter, NavMenu },
  data() {
    return {
      resizeFunction: null,
      rawProductCategories: [],
      rawSocials: []
    }
  },
  async fetch() {
    await Promise.all([this.getProductCategories(), this.getSocials()])
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
          content: this.ogImageUrl
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.ogImageUrl
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
    socials() {
      return this.rawSocials
        .filter((social) => !!this.$_get(social, 'attributes.url'))
        .map((social) => ({
          type: this.$_get(social, 'attributes.type'),
          url: this.$_get(social, 'attributes.url')
        }))
    },
    fullUrl() {
      return `${process.env.NUXT_WEB_BASE_URL}${this.$route.fullPath}`
    },
    ogImageUrl() {
      return `${process.env.NUXT_WEB_BASE_URL}/images/logo-share.jpeg`
    },
    isHomePage() {
      return (
        this.$route.path === '/' ||
        this.localeRoute('index')?.name === this.$route.name
      )
    },
    scrollTriggerOptions() {
      if (!this.isHomePage) {
        return {
          trigger: 'body',
          start: () => `64 top`
        }
      }
      return {
        trigger: 'body',
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
    async getSocials() {
      const { data } = await getSocials(this.$axios, {
        sort: ['order:asc']
      })
      this.rawSocials = data
    },
    resizeHandler() {
      clearTimeout(this.resizeFunction)
      this.resizeFunction = setTimeout(() => {
        this.resize()
      }, 100)
    },
    resize() {
      this.$store.commit('setWindowWidth', window.innerWidth)
      this.$store.commit('setWindowHeight', window.innerHeight)
      // const vh = window.innerHeight * 0.01
      // document.documentElement.style.setProperty('--vh-unit', `${vh}px`)
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

<style scoped lang="scss">
.content-wrapper {
  & > * {
    @apply w-full;
  }
}
</style>
