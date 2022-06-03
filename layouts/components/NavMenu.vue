<template>
  <nav
    ref="nav"
    :class="[
      'nav-wrapper',
      {
        'nav-wrapper--fixed': navStickTop,
        'nav-wrapper--top-absolute-transparent':
          transparentAndAbsoluteAtTop && !navStickTop
      }
    ]"
  >
    <div class="main-container flex h-full items-center justify-between">
      <nuxt-link
        :to="localePath('index')"
        :class="[
          'h-20 py-2',
          { '!h-16': navStickTop || !transparentAndAbsoluteAtTop }
        ]"
      >
        <img :src="logoImg" alt="CheckTech" class="h-full" />
      </nuxt-link>
      <div
        class="cursor-pointer p-1 pr-0 md:hidden"
        @click="navBarOpen = !navBarOpen"
      >
        <font-awesome-icon icon="bars" size="xl" />
      </div>
      <div class="hidden md:block">
        <app-menu
          :mode="md ? 'horizontal' : 'vertical'"
          class="font-medium"
          router
        >
          <app-menu-item index="0" disable-routing> 關於大將 </app-menu-item>
          <app-submenu index="2">
            <template #title> 產品 </template>
            <app-menu-item index="3" disable-routing> 連接器 </app-menu-item>
            <app-menu-item index="4" disable-routing> 開關 </app-menu-item>
            <app-menu-item index="5" disable-routing> 線材 </app-menu-item>
            <app-menu-item :index="localePath('products')">
              {{ $t('common.all') }}
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
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMenu from '~/layouts/components/AppMenu'
import AppMenuItem from '~/layouts/components/AppMenuItem'
import AppSubmenu from '~/layouts/components/AppSubmenu'

export default {
  name: 'NavMenu',
  components: {
    AppMenu,
    AppMenuItem,
    AppSubmenu
  },
  props: {
    transparentAndAbsoluteAtTop: {
      type: Boolean,
      default: false
    },
    scrollTriggerOptions: {
      type: Object,
      default: () => {}
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
        ? require('@/assets/images/logo.png')
        : require('@/assets/images/logo-white.png')
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
