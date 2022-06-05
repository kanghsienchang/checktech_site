const isDev = process.env.NODE_ENV === 'development'
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    fallback: true,
    exclude: [/^.*\/products/]
  },

  loading: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head() {
    return {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          type: 'image/png',
          href: '/favicon-180.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '32x32',
          type: 'image/png',
          href: '/favicon-32.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '16x16',
          type: 'image/png',
          href: '/favicon-16.png'
        },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&display=swap'
        }
      ]
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/styles/tailwind.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/fontawesome.js' },
    { src: '~/plugins/lodash.js' },
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/modal.js' },
    { src: '~/plugins/scroll-lock.js' },
    { src: '~/plugins/swiper.js', mode: 'client' },
    { src: '~/plugins/lazy-load.js', mode: 'client' },
    isDev ? { src: '~/plugins/preview.js', mode: 'client' } : {},
    // { src: '~/plugins/router-i18n.js' },
    { src: '~/plugins/gsap.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/postcss8',
    '@nuxtjs/device',
    '@nuxtjs/svg',
    '@nuxtjs/dotenv'
    // '@nuxtjs/router'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NUXT_API_BASE_URL
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        dataKey: 'en',
        name: 'English',
        file: 'en.json'
      },
      {
        code: 'tw',
        iso: 'zh-TW',
        dataKey: 'zh_TW',
        name: '繁體中文',
        file: 'zh_TW.json'
      }
    ],
    langDir: 'i18n/',
    vueI18n: {
      fallbackLocale: 'tw',
      silentFallbackWarn: true
    },
    seo: true,
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root' // recommended
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    transpile: ['gsap']
  },

  server: {
    host: '0'
  },
  watchers: {
    webpack: {
      ignored: ['.idea', '.eslintcache', '.git']
    }
  }
}
