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
    <div class="submenu__title" :style="[paddingStyle]" @click="handleClick">
      <slot name="title" />
      <font-awesome-icon icon="chevron-down" size="xs" class="ml-2" />
    </div>
    <div>
      <ul
        v-show="opened"
        role="menu"
        class="el-menu el-menu--inline"
      >
        <slot />
      </ul>
    </div>
  </li>
</template>

<script>
import menuMixin from '~/layouts/components/menuMixin'
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'Submenu',
  componentName: 'Submenu',
  mixins: [menuMixin, emitterMixin],
  props: {
    index: {
      type: String,
      required: true
    },
    disabled: Boolean
  },
  data () {
    return {
      items: {},
      submenus: {}
    }
  },
  computed: {
    opened () {
      return this.rootMenu.openedMenus.includes(this.index)
    },
    mode () {
      return this.rootMenu.mode
    },
    active () {
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
  mounted () {
    this.parentMenu.addSubmenu(this)
    this.rootMenu.addSubmenu(this)
  },
  beforeDestroy () {
    this.parentMenu.removeSubmenu(this)
    this.rootMenu.removeSubmenu(this)
  },
  methods: {
    addItem (item) {
      this.$set(this.items, item.index, item)
    },
    removeItem (item) {
      delete this.items[item.index]
    },
    addSubmenu (item) {
      this.$set(this.submenus, item.index, item)
    },
    removeSubmenu (item) {
      delete this.submenus[item.index]
    },
    handleClick () {
      const { rootMenu, disabled } = this
      if (
        (rootMenu.mode === 'horizontal') ||
        (rootMenu.collapse && rootMenu.mode === 'vertical') ||
        disabled
      ) {
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
      @apply px-6
    }
  }
}

.submenu {
  &.is-opened {
    .submenu__title {
      svg {
        @apply -rotate-180 duration-200 ease-out;
      }
    }
  }
  &__title {
    @apply py-1.5 cursor-pointer select-none flex justify-between items-center;
  }
}
</style>
