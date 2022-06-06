<template>
  <li
    :class="[
      'submenu',
      {
        'is-active': active,
        'is-opened': opened,
        'is-disabled': disabled
      }
    ]"
    role="menuitem"
    aria-haspopup="true"
    :aria-expanded="opened"
  >
    <div
      :class="['submenu__title']"
      :style="[paddingStyle]"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <span><slot name="title" /></span>
      <font-awesome-icon icon="chevron-down" size="xs" class="ml-2" />
    </div>
    <div
      ref="menuWrapper"
      @mouseenter="handleMouseEnter(100)"
      @mouseleave="handleMouseLeave"
    >
      <component :is="mode === 'vertical' ? 'collapse-transition' : 'span'">
        <ul
          v-show="opened"
          ref="menu"
          role="menu"
          :class="[
            'menu menu--vertical-inner',
            {
              'menu--popup': mode === 'horizontal'
            }
          ]"
        >
          <slot />
        </ul>
      </component>
    </div>
  </li>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { CollapseTransition } from '@ivanv/vue-collapse-transition'
import menuMixin from '~/layouts/components/menuMixin'
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'AppSubmenu',
  componentName: 'Submenu',
  components: {
    CollapseTransition
  },
  mixins: [menuMixin, emitterMixin],
  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    disabled: Boolean
  },
  data() {
    return {
      items: {},
      submenus: {},
      popper: null,
      timeout: null,
      mouseInChild: false,
      animation: null
    }
  },
  computed: {
    opened() {
      return this.rootMenu.openedMenus.includes(this.index)
    },
    mode() {
      return this.rootMenu.mode
    },
    active() {
      let isActive = false
      const submenus = this.submenus
      const items = this.items
      Object.keys(items).forEach((index) => {
        if (items[index].active) {
          isActive = true
        }
      })
      Object.keys(submenus).forEach((index) => {
        if (submenus[index].active) {
          isActive = true
        }
      })
      return isActive
    }
  },
  watch: {
    opened() {
      if (this.mode === 'horizontal') {
        this.$nextTick(async () => {
          await this.popper.update()
          this.animation.restart()
        })
      }
    },
    mode: {
      handler() {
        if (process.client) return
        this.init()
      }
    }
  },
  created() {
    this.$on('mouse-enter-child', () => {
      this.mouseInChild = true
      clearTimeout(this.timeout)
    })
    this.$on('mouse-leave-child', () => {
      this.mouseInChild = false
      clearTimeout(this.timeout)
    })
  },
  mounted() {
    this.init()
    this.parentMenu.addSubmenu(this)
    this.rootMenu.addSubmenu(this)
  },
  beforeDestroy() {
    this.parentMenu.removeSubmenu(this)
    this.rootMenu.removeSubmenu(this)
    this.tearDown()
  },
  methods: {
    init() {
      if (this.mode === 'horizontal') {
        this.popper = createPopper(this.$el, this.$refs.menuWrapper, {
          placement: 'bottom'
        })
        this.animation = this.$gsap.from(this.$refs.menu, {
          duration: 0.2,
          opacity: 0,
          y: 10,
          paused: true
        })
      } else {
        this.tearDown()
      }
    },
    tearDown() {
      if (this.popper) {
        this.popper.destroy()
      }
      if (this.animation) {
        this.animation.kill()
      }
    },
    handleMouseEnter(showTimeout = this.showTimeout) {
      if (this.disabled || this.mode === 'vertical') return
      this.dispatch('Submenu', 'mouse-enter-child')
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.rootMenu.openMenu(this.index)
      }, showTimeout)
    },
    handleMouseLeave() {
      if (this.disabled || this.mode === 'vertical') return
      this.dispatch('Submenu', 'mouse-leave-child')
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        !this.mouseInChild && this.rootMenu.closeMenu(this.index)
      }, this.hideTimeout)
    },
    addItem(item) {
      this.$set(this.items, item.index, item)
    },
    removeItem(item) {
      delete this.items[item.index]
    },
    addSubmenu(item) {
      this.$set(this.submenus, item.index, item)
    },
    removeSubmenu(item) {
      delete this.submenus[item.index]
    },
    handleClick() {
      const { rootMenu, disabled } = this
      if (rootMenu.mode === 'horizontal' || disabled) {
        return
      }
      this.dispatch('Menu', 'submenu-click', this)
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  &--horizontal {
    .submenu__title {
      @apply px-5 py-1.5;
    }
  }
  &--vertical {
    & > {
      .submenu {
        @apply border-b;
        .submenu__title {
          @apply py-5;
        }
      }
    }
  }
}

.submenu {
  @apply relative;
  &.is-opened {
    //.submenu__title {
    //  svg {
    //    @apply -rotate-180 duration-200 ease-out;
    //  }
    //}
  }
  &__title {
    @apply flex w-full cursor-pointer select-none items-center justify-between leading-none;
  }
}
</style>
