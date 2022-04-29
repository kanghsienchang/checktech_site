<template>
  <nav
    :class="['flex justify-between items-center absolute top-0 right-0 left-0', {
      'bg-transparent fixed': navStickTop,
    }]"
    :style="{height: navHeightInPx + 'px'}"
  >
    <div class="h-[2.75rem] md:h-12 flex-shrink-0">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-full">
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
    <ul class="ml-4">
      <li>
        <button class="py-2 px-4 rounded-md bg-primary text-white">
          聯絡我們
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navHeightInPx: 80,
      navStickTop: false
    }
  },
  mounted () {
    this.handleScroll()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      this.navStickTop = window.scrollY > this.navHeightInPx
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  @apply flex ml-auto text-white;
}

.nav-item {
  @apply p-4 cursor-pointer relative tracking-wide font-bold;
  &:hover {
    .nav-submenu {
      @apply top-[100%] pointer-events-auto opacity-[0.95];
    }
  }
}

.nav-submenu {
  @apply opacity-0 drop-shadow-md block absolute bg-white py-3 px-4 text-gray-600 rounded top-[120%] inset-x-0 h-auto min-w-[10rem] py-4 transition-all ease-out pointer-events-none;
}

.nav-submenu-item {
  @apply py-1.5 text-[0.9375rem];
}

</style>
