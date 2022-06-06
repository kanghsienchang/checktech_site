<template>
  <li
    :class="[
      'menu-item',
      {
        'is-active': active,
        'pointer-events-none text-slate-400': disabled
      }
    ]"
    role="menuitem"
    tabindex="-1"
  >
    <component
      :is="shouldUseRouter ? 'nuxt-link' : 'div'"
      class="block w-full"
      :to="index"
      :style="[paddingStyle]"
      @click.native="handleClick"
      @click="handleClick"
    >
      <slot />
    </component>
  </li>
</template>

<script>
import menuMixin from '~/layouts/components/menuMixin'
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'AppMenuItem',
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
    },
    disableRouting: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex
    },
    mode() {
      return this.rootMenu.mode
    },
    shouldUseRouter() {
      return !this.disableRouting && this.rootMenu.router
    }
  },
  mounted() {
    this.parentMenu.addItem(this)
    this.rootMenu.addItem(this)
  },
  beforeDestroy() {
    this.parentMenu.removeItem(this)
    this.rootMenu.removeItem(this)
  },
  methods: {
    handleClick() {
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
      @apply px-5;
    }
  }
  &--vertical {
    & > .menu-item {
      @apply border-b;
      & > * {
        @apply py-5;
      }
    }
  }
  &--vertical-inner {
    & > .menu-item > * {
      @apply py-3;
    }
  }
}
.menu-item {
  @apply flex cursor-pointer select-none items-center whitespace-nowrap leading-none;
}
</style>
