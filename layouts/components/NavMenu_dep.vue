<template>
  <nav
    ref="nav"
    v-scroll-lock="navBarOpen"
    :class="[
      'nav-wrapper',
      {
        'nav-wrapper--fixed': navStickTop || navBarOpen,
        'nav-wrapper--top-absolute-transparent':
          transparentAndAbsoluteAtTop && !navStickTop,
        'bottom-0 !bg-white text-slate-800': navBarOpen
      }
    ]"
  >
    <div
      class="main-container flex h-full flex-wrap content-start justify-between"
    >
      <nuxt-link
        :to="localePath('index')"
        :class="[
          'h-20 py-2',
          { '!h-16': navStickTop || !transparentAndAbsoluteAtTop || navBarOpen }
        ]"
      >
        <img src="logoImg" alt="CheckTech" class="h-full" />
      </nuxt-link>
      <div
        class="cursor-pointer p-1 pr-0 md:hidden"
        @click="navBarOpen = !navBarOpen"
      >
        <font-awesome-icon icon="bars" size="xl" />
      </div>
      <div
        :class="[
          'hidden md:flex md:overflow-y-hidden',
          {
            '!flex w-full !flex-col': navBarOpen
          }
        ]"
      >
        <app-menu
          class="font-medium"
          router
          :mode="md ? 'horizontal' : 'vertical'"
        >
          <app-menu-item index="0" disable-routing>
            {{ $t('route.about_us') }}
          </app-menu-item>
          <app-menu-item :index="localePath({ name: 'esg' })">
            {{ $t('route.esg') }}
          </app-menu-item>
          <app-submenu index="2">
            <template #title> {{ $t('route.products') }} </template>
            <app-menu-item :index="localePath('products')">
              {{ $t('common.all') }}
            </app-menu-item>
            <app-menu-item
              v-for="productCategory in productCategories"
              :key="productCategory.key"
              :index="
                localePath({
                  name: 'products',
                  query: { category: productCategory.key }
                })
              "
            >
              {{ productCategory.name }}
            </app-menu-item>
          </app-submenu>
          <app-submenu index="3">
            <template #title>
              <font-awesome-icon icon="globe" class="mr-2" />
              <span>
                {{ currentLocaleObj.name }}
              </span>
            </template>
            <app-menu-item
              v-for="locale in $i18n.locales"
              :key="locale.code"
              :disabled="currentLocaleObj.code === locale.code"
              :index="switchLocalePath(locale.code)"
            >
              {{ locale.name }}
            </app-menu-item>
          </app-submenu>
        </app-menu>
        <c-button
          v-if="navStickTop || !transparentAndAbsoluteAtTop"
          class="ml-5"
          outline
          :to="localePath({ name: 'contact-us' })"
        >
          {{ $t('route.contact_us') }}
        </c-button>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMenu from '~/layouts/components/AppMenu'
import AppMenuItem from '~/layouts/components/AppMenuItem'
import AppSubmenu from '~/layouts/components/AppSubmenu'
import CButton from '~/components/ui/Button'

export default {
  name: 'NavMenu',
  components: {
    CButton,
    AppMenu,
    AppMenuItem,
    AppSubmenu
  },
  props: {
    productCategories: {
      type: Array,
      default: () => []
    },
    transparentAndAbsoluteAtTop: {
      type: Boolean,
      default: false
    },
    scrollTriggerOptions: {
      type: Object,
      default: () => {}
    },
    showContactUs: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      navStickTop: false,
      navBarOpen: false
    }
  },
  computed: {
    ...mapGetters(['md']),
    logoImg() {
      return this.navStickTop || !this.transparentAndAbsoluteAtTop
        ? '/images/logo.png'
        : '/images/logo-white.png'
    },
    currentLocaleObj() {
      return this.$i18n.locales.find(({ code }) => code === this.$i18n.locale)
    }
  },
  mounted() {
    const animation = this.$gsap
      .timeline({ paused: true })
      .set(this.$refs.nav, {
        y: '-100%',
        opacity: 0,
        onReverseComplete: () => (this.navStickTop = false),
        onComplete: () => (this.navStickTop = true)
      })
      .to(this.$refs.nav, {
        duration: 0.25,
        opacity: 1,
        y: 0
      })
      .progress(-1)

    this.$ScrollTrigger.create({
      id: 'header-scroll-trigger',
      animation,
      end: '+=0 top',
      toggleActions: 'play none reverse none',
      immediateRender: false,
      nullTargetWarn: false,
      ...this.scrollTriggerOptions
    })
  },
  beforeDestroy() {
    const st = this.$ScrollTrigger.getById('header-scroll-trigger')
    if (st) {
      st.kill()
    }
  }
}
</script>

<style scoped lang="scss">
.nav-wrapper {
  @apply absolute top-0 right-0 left-0 z-30 bg-white/[0.97] text-slate-800 shadow-sm;
  &--top-absolute-transparent {
    @apply absolute bg-transparent text-white shadow-none;
  }
  &--fixed {
    @apply fixed;
    &::v-deep {
      .menu-item,
      .submenu__title {
        @apply transition-colors duration-200 hover:text-primary-500;
      }
    }
  }
  &::v-deep {
    .menu--popup {
      .menu-item,
      .submenu__title {
        @apply transition-colors duration-200 hover:text-primary-500;
      }
    }
  }
}
</style>
