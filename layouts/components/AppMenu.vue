<template>
  <ul
    :class="[
      'menu',
      {
        'menu--horizontal': mode === 'horizontal',
        'menu--vertical': mode === 'vertical'
      }
    ]"
    role="menubar"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'Menu',
  componentName: 'Menu',
  provide() {
    return {
      rootMenu: this
    }
  },
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    defaultActive: {
      type: String,
      default: ''
    },
    router: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeIndex: this.defaultActive,
      openedMenus: [],
      items: {},
      submenus: {}
    }
  },
  mounted() {
    // this.initOpenedMenu();
    // this.$on('item-click', this.handleItemClick)
    this.$on('submenu-click', this.handleSubmenuClick)
    // this.$watch('items', this.updateActiveIndex)
  },
  methods: {
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
    openMenu(index) {
      const openedMenus = this.openedMenus
      if (openedMenus.includes(index)) {
        return
      }
      this.openedMenus.push(index)
    },
    closeMenu(index) {
      const i = this.openedMenus.indexOf(index)
      if (i !== -1) {
        this.openedMenus.splice(i, 1)
      }
    },
    handleSubmenuClick(submenu) {
      const { index, indexPath } = submenu
      const isOpened = this.openedMenus.includes(index)

      if (isOpened) {
        this.closeMenu(index)
        this.$emit('close', index, indexPath)
      } else {
        this.openMenu(index, indexPath)
        this.$emit('open', index, indexPath)
      }
    }
    // handleItemClick (item) {
    //   const { index, indexPath } = item
    //   const oldActiveIndex = this.activeIndex
    //   const hasIndex = !!item.index
    //
    //   if (hasIndex) {
    //     this.activeIndex = item.index
    //   }
    //
    //   this.$emit('select', index, indexPath, item)
    //
    //   if (this.mode === 'horizontal') {
    //     this.openedMenus = []
    //   }
    //
    //   if (this.router && hasIndex) {
    //     this.routeToItem(item, (error) => {
    //       this.activeIndex = oldActiveIndex
    //       if (error) {
    //         // vue-router 3.1.0+ push/replace cause NavigationDuplicated error
    //         // https://github.com/ElemeFE/element/issues/17044
    //         if (error.name === 'NavigationDuplicated') { return }
    //         console.error(error)
    //       }
    //     })
    //   }
    // }
  }
}
</script>

<style lang="scss">
.menu {
  @apply flex font-medium;
  &--horizontal {
    @apply flex-row;
  }
  &--vertical {
    @apply flex-col;
  }
  &--popup {
    @apply mt-2 flex-col rounded-md bg-white px-6 py-3 text-main shadow;
  }
}
</style>
