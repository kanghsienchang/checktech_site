<template>
  <nav
    ref="nav"
    :class="['nav-wrapper', { 'nav-wrapper--fixed': navStickTop }]"
  >
    <div class="main-container h-full flex justify-between items-center">
      <div :class="['h-20 py-2', {'!h-16': navStickTop}]">
        <img :src="logoImg" alt="Logo" class="h-full max-w-full max-h-full">
      </div>
      <ul class="nav !hidden md:!flex">
        <li class="nav-item">
          關於大將
        </li>
        <li class="nav-item">
          能力與服務
        </li>
        <li class="nav-item">
          產品
          <font-awesome-icon icon="chevron-down" size="xs" />
          <ul class="nav-submenu">
            <li class="nav-submenu-item">
              開關
            </li>
            <li class="nav-submenu-item">
              連接器
            </li>
            <li class="nav-submenu-item">
              耳機插座
            </li>
          </ul>
        </li>
        <li class="nav-item">
          繁體中文
          <font-awesome-icon icon="chevron-down" size="xs" />
          <ul class="nav-submenu !min-w-0">
            <li class="nav-submenu-item">
              English
            </li>
            <li class="nav-submenu-item">
              簡體中文
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
export default {
  name: 'NavMenu',
  data () {
    return {
      navHeightInPx: 80,
      navStickTop: false
    }
  },
  computed: {
    logoImg () {
      return this.navStickTop ? require('@/assets/images/logo.png') : require('@/assets/images/logo-white.png')
    }
  },
  mounted () {
    const animation = gsap.timeline({ paused: true })
      .set(this.$refs.nav, {
        y: '-100%',
        opacity: 0,
        onReverseComplete: () => (this.navStickTop = false),
        onComplete: () => (this.navStickTop = true)
      }).to(this.$refs.nav, {
        duration: 0.25,
        opacity: 1,
        y: 0
      }).progress(-1)

    ScrollTrigger.create({
      id: 'header-scroll-trigger',
      trigger: '#home-header',
      animation,
      start: '70% top',
      end: '+=0 top',
      toggleActions: 'play none reverse none',
      immediateRender: false
    })
  },
  beforeUnmount () {
    const st = ScrollTrigger.getById('header-scroll-trigger')
    if (st) { st.kill() }
  }
}
</script>

<style scoped lang="scss">
.nav-wrapper {
  @apply absolute top-0 right-0 left-0 z-50 text-white;
  &--fixed {
    @apply bg-white/[0.97] text-main shadow-sm fixed;
  }
}

.nav {
  @apply flex ml-auto;
}

.nav-item {
  @apply py-6 px-5 cursor-pointer relative tracking-wide font-bold;
  &:hover {
    .nav-submenu {
      @apply top-[100%] pointer-events-auto opacity-[0.95];
    }
  }
}
.nav-wrapper--fixed .nav-item:hover .nav-submenu {
  @apply mt-2 opacity-100;
}

.nav-submenu {
  @apply opacity-0 shadow block absolute bg-white py-3 px-4 text-gray-600 rounded min-w-[10rem] top-[120%] inset-x-0 h-auto w-full py-4 transition-all ease-out pointer-events-none;
  &:before {
    @apply absolute -top-4 inset-0 w-full h-full content-[""] block -z-10;
  }
}
.nav-submenu-item {
  @apply py-1.5 text-[0.9375rem];
}

</style>
