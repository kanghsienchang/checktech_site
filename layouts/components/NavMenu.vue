<template>
  <nav
    ref="nav"
    :class="['nav-wrapper', { 'nav-wrapper--fixed': navStickTop }]"
  >
    <div class="main-container flex h-full items-center justify-between">
      <nuxt-link to="/" :class="['h-20 py-2', { '!h-16': navStickTop }]">
        <img :src="logoImg" alt="CheckTech" class="h-full" />
      </nuxt-link>
      <div
        class="cursor-pointer p-1 pr-0 sm:hidden"
        @click="navBarOpen = !navBarOpen"
      >
        <font-awesome-icon icon="bars" size="xl" />
      </div>
      <portal :disabled="sm">
        <!--:class="[!sm && 'fixed inset-0 bg-footer z-50 px-4 py-2 w-[15rem] text-white']"-->
        <div>
          <app-menu :mode="sm ? 'horizontal' : 'vertical'" class="font-medium">
            <app-menu-item index="0"> 關於大將 </app-menu-item>
            <app-menu-item index="1"> 能力與服務 </app-menu-item>
            <app-submenu index="2">
              <template #title> 產品 </template>
              <app-menu-item index="3"> 開關 </app-menu-item>
              <app-menu-item index="4"> 連接器 </app-menu-item>
              <app-menu-item index="5"> 耳機插座 </app-menu-item>
            </app-submenu>
          </app-menu>
          <!--<ul :class="['nav', {'nav&#45;&#45;vertical': !sm}]">-->
          <!--  <li class="nav-item">-->
          <!--    關於大將-->
          <!--  </li>-->
          <!--  <li class="nav-item">-->
          <!--    能力與服務-->
          <!--  </li>-->
          <!--  <li class="nav-item">-->
          <!--    產品-->
          <!--    <font-awesome-icon icon="chevron-down" size="xs" />-->
          <!--    <ul class="nav-submenu">-->
          <!--      <li class="nav-submenu-item">-->
          <!--        開關-->
          <!--      </li>-->
          <!--      <li class="nav-submenu-item">-->
          <!--        連接器-->
          <!--      </li>-->
          <!--      <li class="nav-submenu-item">-->
          <!--        耳機插座-->
          <!--      </li>-->
          <!--    </ul>-->
          <!--  </li>-->
          <!--  <li class="nav-item">-->
          <!--    繁體中文-->
          <!--    <font-awesome-icon icon="chevron-down" size="xs" />-->
          <!--    <ul class="nav-submenu !min-w-0">-->
          <!--      <li class="nav-submenu-item">-->
          <!--        English-->
          <!--      </li>-->
          <!--      <li class="nav-submenu-item">-->
          <!--        簡體中文-->
          <!--      </li>-->
          <!--    </ul>-->
          <!--  </li>-->
          <!--</ul>-->
        </div>
      </portal>
    </div>
  </nav>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal'
import { mapGetters } from 'vuex'
import AppMenu from '~/layouts/components/AppMenu'
import AppMenuItem from '~/layouts/components/AppMenuItem'
import AppSubmenu from '~/layouts/components/AppSubmenu'

export default {
  name: 'NavMenu',
  components: {
    AppMenu,
    AppMenuItem,
    AppSubmenu,
    Portal
  },
  data() {
    return {
      navHeightInPx: 80,
      navStickTop: false,
      navBarOpen: false
    }
  },
  computed: {
    ...mapGetters(['sm']),
    logoImg() {
      return this.navStickTop
        ? require('@/assets/images/logo.png')
        : require('@/assets/images/logo-white.png')
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
      trigger: '#home-header',
      animation,
      start: '70% top',
      end: '+=0 top',
      toggleActions: 'play none reverse none',
      immediateRender: false
    })
  },
  beforeUnmount() {
    const st = this.$ScrollTrigger.getById('header-scroll-trigger')
    if (st) {
      st.kill()
    }
  }
}
</script>

<style scoped lang="scss">
.nav-wrapper {
  @apply absolute top-0 right-0 left-0 z-30 text-white;
  &--fixed {
    @apply fixed bg-white/[0.97] text-main shadow-sm;
  }
}

.nav {
  @apply ml-auto flex;

  &--vertical {
    @apply flex-col;
    .nav-item {
      @apply px-0 py-2.5;
    }
    .nav-submenu {
    }
  }
}

.nav-item {
  @apply relative cursor-pointer py-6 px-5 font-medium tracking-wide;
  &:hover {
    .nav-submenu {
      @apply pointer-events-auto top-[100%] opacity-[0.95];
    }
  }
}
.nav-wrapper--fixed .nav-item:hover .nav-submenu {
  @apply mt-2 opacity-100;
}

.nav-submenu {
  @apply pointer-events-none absolute inset-x-0 top-[120%] block h-auto w-full min-w-[10rem] rounded bg-white py-3 px-4 py-4 text-gray-600 opacity-0 shadow transition-all ease-out;
  &:before {
    @apply absolute inset-0 -top-4 -z-10 block h-full w-full content-[""];
  }
}
.nav-submenu-item {
  @apply py-1.5 text-[0.9375rem];
}
</style>
