<template>
  <nav
    ref="navMenu"
    v-scroll-lock="navBarOpen"
    :class="[
      'nav-menu absolute inset-x-0 top-0 z-30 bg-white shadow-sm',
      {
        'bg-transparent text-white shadow-none':
          onTransparentBg && !navBarOpen && !navStickTop
      },
      {
        '!fixed': navBarOpen || navStickTop
      },
      {
        'bottom-0': navBarOpen
      }
    ]"
  >
    <div class="main-container flex items-center justify-between">
      <nuxt-link
        :to="localePath('index')"
        :class="[
          'h-[4rem] py-2.5',
          {
            'h-[5rem]': onTransparentBg && !navBarOpen && !navStickTop
          }
        ]"
        @click.native="navBarOpen = false"
      >
        <img :src="logoImg" alt="CheckTech" class="h-full" />
      </nuxt-link>
      <div
        class="cursor-pointer p-1 pr-0 lg:hidden"
        @click="navBarOpen = !navBarOpen"
      >
        <font-awesome-icon v-if="!navBarOpen" icon="bars" size="xl" />
        <font-awesome-icon v-else icon="xmark" size="xl" />
      </div>
      <div class="hidden lg:flex lg:items-center">
        <app-menu mode="horizontal" router>
          <template v-for="menuItem in menu">
            <app-submenu
              v-if="menuItem.children"
              :key="menuItem.key"
              :disabled="!!menuItem.disabled"
              :index="menuItem.key"
            >
              <template #title>
                <font-awesome-icon
                  v-if="menuItem.icon"
                  :icon="menuItem.icon"
                  class="mr-2"
                />
                {{ menuItem.label }}
              </template>
              <app-menu-item
                v-for="child in menuItem.children"
                :key="child.key"
                :disabled="!!child.disabled"
                :index="child.link"
                :disable-routing="!child.link"
              >
                <font-awesome-icon
                  v-if="child.icon"
                  :icon="child.icon"
                  class="mr-2"
                />
                {{ child.label }}
              </app-menu-item>
            </app-submenu>
            <app-menu-item
              v-else
              :key="menuItem.key"
              :disabled="!!menuItem.disabled"
              :index="menuItem.link"
              :disable-routing="!menuItem.link"
            >
              <font-awesome-icon
                v-if="menuItem.icon"
                :icon="menuItem.icon"
                class="mr-2"
              />
              {{ menuItem.label }}
            </app-menu-item>
          </template>
        </app-menu>
        <c-button
          v-if="showContactUs && navStickTop"
          outline
          :to="localePath({ name: 'contact-us' })"
          class="ml-5"
        >
          {{ $t('route.contact_us') }}
        </c-button>
      </div>
    </div>
    <div v-show="navBarOpen" class="main-container mt-2 lg:hidden">
      <app-menu router mode="vertical">
        <template v-for="menuItem in menu">
          <app-submenu
            v-if="menuItem.children"
            :key="menuItem.key"
            :disabled="!!menuItem.disabled"
            :index="menuItem.key"
          >
            <template #title>
              <font-awesome-icon
                v-if="menuItem.icon"
                :icon="menuItem.icon"
                class="mr-2"
              />
              {{ menuItem.label }}
            </template>
            <app-menu-item
              v-for="child in menuItem.children"
              :key="child.key"
              :disabled="!!child.disabled"
              :index="child.link"
              :disable-routing="!child.link"
              @click="navBarOpen = false"
            >
              <font-awesome-icon
                v-if="child.icon"
                :icon="child.icon"
                class="mr-2"
              />
              {{ child.label }}
            </app-menu-item>
          </app-submenu>
          <app-menu-item
            v-else
            :key="menuItem.key"
            :disabled="!!menuItem.disabled"
            :index="menuItem.link"
            :disable-routing="!menuItem.link"
            @click="navBarOpen = false"
          >
            <font-awesome-icon
              v-if="menuItem.icon"
              :icon="menuItem.icon"
              class="mr-2"
            />
            {{ menuItem.label }}
          </app-menu-item>
        </template>
      </app-menu>
      <c-button
        class="mt-6 w-full"
        outline
        :to="localePath({ name: 'contact-us' })"
        @click.native="navBarOpen = false"
      >
        {{ $t('route.contact_us') }}
      </c-button>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMenu from '~/layouts/components/AppMenu'
import AppSubmenu from '~/layouts/components/AppSubmenu'
import AppMenuItem from '~/layouts/components/AppMenuItem'
import CButton from '~/components/ui/Button'
export default {
  name: 'NavMenu',
  components: { CButton, AppMenuItem, AppSubmenu, AppMenu },
  props: {
    productCategories: {
      type: Array,
      default: () => []
    },
    onTransparentBg: {
      type: Boolean,
      default: false
    },
    showContactUs: {
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
      navBarOpen: false,
      navStickTop: false,
      st: null
    }
  },
  computed: {
    ...mapGetters(['lg']),
    logoImg() {
      return this.onTransparentBg && !this.navBarOpen && !this.navStickTop
        ? '/images/logo-white.png'
        : '/images/logo.png'
    },
    menu() {
      return [
        {
          key: 'about-us',
          label: this.$t('route.about_us'),
          link: this.localePath({ name: 'about' })
        },
        {
          key: 'products',
          label: this.$t('route.products'),
          link: this.localePath({ name: 'products' }),
          children: [
            {
              key: 'all',
              label: this.$t('common.all'),
              link: this.localePath({ name: 'products' })
            },
            ...this.productCategories.map((category) => ({
              key: category.key,
              label: category.name,
              link: this.localePath({
                name: 'products',
                query: { category: category.key }
              })
            }))
          ]
        },
        {
          key: 'applications',
          label: this.$t('route.application'),
          link: this.localePath({ name: 'applications' })
        },
        {
          key: 'esg',
          label: this.$t('route.esg'),
          link: this.localePath({ name: 'esg' })
        },
        {
          key: 'translations',
          icon: 'globe',
          label: this.$i18n.localeProperties.name,
          children: this.$i18n.locales.map((locale) => ({
            key: locale.code,
            label: locale.name,
            link:
              this.switchLocalePath(locale.code) ||
              this.$route.fullPath.replace(this.$i18n.locale, locale.code),
            disabled: locale.code === this.$i18n.locale
          }))
        }
      ]
    }
  },
  watch: {
    lg() {
      this.navBarOpen = false
    },
    scrollTriggerOptions: {
      handler() {
        this.initSt()
      },
      deep: true
    }
  },
  mounted() {
    this.initSt()
  },
  beforeDestroy() {
    if (this.st) {
      this.st.kill()
    }
  },
  methods: {
    initSt() {
      this.$nextTick(() => {
        if (this.st) {
          this.st.kill(true)
        }
        const animation = this.$gsap
          .timeline({ paused: true })
          .to(this.$refs.navMenu, {
            duration: 0.15,
            opacity: 0,
            y: '-100%',
            onComplete: () => (this.navStickTop = true)
          })
          .to(this.$refs.navMenu, {
            duration: 0.25,
            opacity: 1,
            y: 0,
            onReverseComplete: () => (this.navStickTop = false)
          })
        this.st = this.$ScrollTrigger.create({
          animation,
          end: '+=0 top',
          toggleActions: 'restart none none reverse',
          ...this.scrollTriggerOptions
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.nav-menu {
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
