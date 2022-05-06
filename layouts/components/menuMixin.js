export default {
  inject: ['rootMenu'],
  computed: {
    indexPath () {
      const path = [this.index]
      let parent = this.$parent
      while (parent.$options.componentName !== 'Menu') {
        if (parent.index) {
          path.unshift(parent.index)
        }
        parent = parent.$parent
      }
      return path
    },
    parentMenu () {
      let parent = this.$parent
      while (
        parent &&
        !['Menu', 'Submenu'].includes(parent.$options.componentName)
      ) {
        parent = parent.$parent
      }
      return parent
    },
    paddingStyle () {
      if (this.rootMenu.mode !== 'vertical') { return {} }

      let padding = 0
      let parent = this.$parent

      while (parent && parent.$options.componentName !== 'Menu') {
        if (parent.$options.componentName === 'Submenu') {
          padding += 1
        }
        parent = parent.$parent
      }
      return { paddingLeft: padding + 'rem' }
    }
  }
}
