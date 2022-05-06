<template>
  <li
    :class="[
      'menu-item',
      {
        'is-active': active,
        'is-disabled': disabled
      }
    ]"
    :style="[paddingStyle]"
    role="menuitem"
    tabindex="-1"
  >
    <slot></slot>
  </li>
</template>

<script>
import menuMixin from '~/layouts/components/menuMixin'
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'MenuItem',
  componentName: 'MenuItem',
  mixins: [menuMixin, emitterMixin],
  props: {
    index: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active () {
      return this.index === this.rootMenu.activeIndex
    },
    mode () {
      return this.rootMenu.mode
    }
  },
  mounted () {
    this.parentMenu.addItem(this)
    this.rootMenu.addItem(this)
  },
  beforeDestroy () {
    this.parentMenu.removeItem(this)
    this.rootMenu.removeItem(this)
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.dispatch('Menu', 'item-click', this)
        this.$emit('click', this)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  &--horizontal {
    .menu-item {
      @apply px-6
    }
  }
}
.menu-item {
  @apply py-1.5 cursor-pointer select-none;
}
</style>
