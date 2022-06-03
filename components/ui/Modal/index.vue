<template>
  <transition name="fade-in" @after-leave="handleClosed">
    <div v-show="visible" v-scroll-lock="visible" class="c-modal">
      <div
        class="c-modal__mask"
        @click="closeOnClickMask ? handleClose : () => {}"
      />
      <transition name="zoom">
        <div
          v-show="visible"
          :class="['c-modal__container relative', containerClass]"
        >
          <!--<div v-if="closable" class="c-modal__close" @click="handleClose">-->
          <!--  <font-awesome-icon icon="times" />-->
          <!--</div>-->
          <div class="c-modal__wrapper">
            <div class="c-modal__body">
              <div v-if="$slots.title || title" class="c-modal__header">
                <div class="c-modal__title">
                  <template v-if="$slots.title">
                    <slot name="title" />
                  </template>
                  <template v-else>
                    {{ title }}
                  </template>
                </div>
              </div>
              <div class="c-modal__content">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    containerClass: {
      type: [String, Array],
      default: () => []
    },
    closeOnClickMask: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleClose() {
      if (!this.closable) {
        return
      }
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    handleClosed() {
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss">
$animationDuration: 0.3s;
.c-modal {
  @apply fixed inset-0 flex items-center justify-center;
  z-index: 1999;
  &__mask {
    @apply absolute h-full w-full bg-black opacity-50;
  }
  &__container {
    @apply mx-4;
    z-index: 2000;
  }
  &__wrapper {
    @apply relative w-full overflow-y-auto rounded-md bg-white shadow-md;
  }
  &__body {
    @apply flex h-full flex-col p-6;
  }
  &__header {
    @apply mb-4;
    min-height: 1rem;
  }
  &__content {
    @apply w-full;
    height: calc(100% - 1rem);
  }
  &__close {
    @apply absolute cursor-pointer px-1 text-2xl text-white opacity-75 transition-opacity;
    right: -0.25rem;
    top: -2.25rem;
    &:hover {
      @apply opacity-100;
    }
  }
}
.fade-in-enter-active {
  transition: opacity $animationDuration;
}
.fade-in-enter {
  opacity: 0;
}

@keyframes zoom-enter {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

.zoom-enter-active {
  animation: zoom-enter both $animationDuration cubic-bezier(0.4, 0, 0, 1.25);
}
</style>
