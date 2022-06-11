<template>
  <component
    :is="to ? 'nuxt-link' : 'button'"
    :to="to"
    :class="[
      'btn',
      `btn--${color}`,
      `btn--${size}`,
      {
        'btn--pill': pill,
        'hover:-translate-y-0.5 hover:shadow-md': translateOnHover,
        'pointer-events-none opacity-75': disabled || loading,
        'btn--outline': outline
      }
    ]"
    :disabled="disabled || loading"
    @click.prevent="$emit('click')"
  >
    <font-awesome-icon
      v-if="loading || icon"
      :icon="loading ? 'circle-notch' : icon"
      :spin="loading"
      class="mr-2"
    />
    <span>
      <slot />
    </span>
  </component>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    to: {
      type: [String, Object],
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    pill: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'base'
    },
    outline: {
      type: Boolean,
      default: false
    },
    translateOnHover: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
@mixin outline($color) {
  &.btn--outline {
    @apply text-#{$color} bg-transparent;
    &:hover {
      @apply bg-#{$color};
      @if $color == 'white' {
        @apply text-slate-800;
      } @else {
        @apply text-white;
      }
    }
  }
}

.btn {
  @apply inline-flex cursor-pointer select-none items-center justify-center rounded-md border border-solid border-transparent bg-transparent px-6 py-3 text-center align-middle leading-none tracking-wide text-white outline-none transition-all;

  &:hover {
    @apply text-white;
  }

  &--lg {
    @apply px-6 py-3 text-lg;
  }

  &--pill {
    @apply rounded-full;
  }

  &--primary {
    @apply border-primary-500 bg-primary-500 hover:bg-primary-600;
    @include outline('primary-500');
  }

  &--white {
    @apply border-white bg-white text-slate-800;
    @include outline('white');
    &:hover {
      @apply bg-white text-slate-800;
    }
  }
}
//  &.btn-white:hover,
//  &[class*="btn-soft-"]:hover {
//    @include box-shadow($btn-shadow-sm);
//  }
//  .btn-check:focus+&,
//  &:focus {
//    outline: 0;
//  }
//  .btn-check:checked+&,
//  .btn-check:active+&,
//  &:active,
//  &.active {
//    transform: translateY(-0.15rem);
//  }
//  &:disabled,
//  &.disabled,
//  fieldset:disabled & {
//    pointer-events: none;
//    opacity: $btn-disabled-opacity;
//    @include box-shadow(none);
//  }
//  &.btn-block {
//    padding: 0;
//    width: 2.2rem;
//    height: 2.2rem;
//    display: inline-flex;
//    align-items: center;
//    justify-content: center;
//    @include font-size(1rem);
//    line-height: 1;
//    backface-visibility: hidden;
//    &:disabled,
//    &.disabled,
//    fieldset:disabled & {
//      opacity: 1;
//    }
//    &.btn-sm {
//      width: 1.8rem;
//      height: 1.8rem;
//      @include font-size(1rem);
//    }
//    &.btn-lg {
//      width: 3rem;
//      height: 3rem;
//      @include font-size(1.4rem);
//    }
//    &.btn-play {
//      width: 3.5rem;
//      height: 3.5rem;
//      @include font-size(1.2rem);
//      i {
//        margin-left: 0.15rem;
//      }
//    }
//  }
//  &.btn-circle {
//    padding: 0;
//    border-radius: 100% !important;
//    width: 2.2rem;
//    height: 2.2rem;
//    display: inline-flex;
//    align-items: center;
//    justify-content: center;
//    @include font-size(1rem);
//    line-height: 1;
//    backface-visibility: hidden;
//    &:disabled,
//    &.disabled,
//    fieldset:disabled & {
//      opacity: 1;
//    }
//    &.btn-sm {
//      width: 1.8rem;
//      height: 1.8rem;
//      @include font-size(0.8rem);
//      i {
//        @include font-size(0.85rem);
//      }
//    }
//    &.btn-lg {
//      width: 3rem;
//      height: 3rem;
//      @include font-size(1.3rem);
//    }
//    &.btn-play {
//      width: 3.5rem;
//      height: 3.5rem;
//      @include font-size(2.3rem);
//      i {
//        margin-left: 0.15rem;
//      }
//      &:hover {
//        transform: translateY(0);
//      }
//    }
//    &.counter {
//      @include box-shadow($box-shadow);
//    }
//    .number {
//      display: table-cell;
//      text-align: center;
//      margin: 0 auto;
//      vertical-align: middle;
//      @include font-size(1.1rem);
//      font-weight: $font-weight-bold;
//    }
//  }
//  &.btn-expand {
//    background: none;
//    border: 0;
//    padding-left: 0;
//    padding-top: $btn-padding-y + 0.05;
//    padding-bottom: $btn-padding-y + 0.05;
//    max-height: 2.5rem;
//    @include font-size($btn-font-size + 0.05);
//    span {
//      position: relative;
//      z-index: 2;
//      padding-left: 2.95rem;
//    }
//    i {
//      position: absolute;
//      z-index: 2;
//      width: 2.5rem;
//      height: 2.5rem;
//      top: 0;
//      left: 0;
//      display: flex;
//      align-items: center;
//      justify-content: center;
//      color: $white;
//      @include font-size(1.35rem);
//      transition: $bezier-transition;
//    }
//    &:before {
//      content: "";
//      transition: $bezier-transition;
//      width: auto;
//      height: 2.5rem;
//      position: absolute;
//      top: 0;
//      left: 0;
//      width: 2.5rem;
//      border-radius: $border-radius-pill;
//      z-index: 0;
//    }
//    &:hover {
//      background: none;
//      transform: translateY(0);
//      color: $white;
//      box-shadow: none;
//      i {
//        left: 0.25rem;
//      }
//      &:before {
//        width: 100%;
//      }
//    }
//    &.btn-sm {
//      padding-top: $btn-padding-y-sm + 0.05;
//      padding-bottom: $btn-padding-y-sm + 0.05;
//      @include font-size($btn-font-size-sm + 0.05);
//      i {
//        width: 2.15rem;
//        height: 2.15rem;
//        @include font-size(1.1rem);
//      }
//      span {
//        padding-left: 2.65rem;
//      }
//      &:before {
//        width: 2.15rem;
//      }
//      &:hover {
//        &:before {
//          width: 100%;
//        }
//      }
//    }
//    &.btn-lg {
//      padding-top: $btn-padding-y-lg + 0.05;
//      padding-bottom: $btn-padding-y-lg + 0.05;
//      @include font-size($btn-font-size-lg + 0.05);
//      i {
//        width: 2.9rem;
//        height: 2.9rem;
//        @include font-size(1.35rem);
//      }
//      span {
//        padding-left: 3.4rem;
//      }
//      &:before {
//        width: 2.9rem;
//      }
//      &:hover {
//        &:before {
//          width: 100%;
//        }
//      }
//    }
//  }
//}
//.btn-white,
//.btn-white:focus,
//.btn-white:not(.btn-play):hover,
//.btn-outline-white:hover,
//.btn-white.btn-expand i {
//  color: $main-dark;
//}
//.btn-white.btn-play:hover {
//  color: $main-color;
//}
//
//.btn-lg {
//  @include button-size($btn-padding-y-lg,
//    $btn-padding-x-lg,
//    $btn-font-size-lg,
//    $btn-border-radius-lg);
//}
//.btn-sm {
//  @include button-size($btn-padding-y-sm,
//    $btn-padding-x-sm,
//    $btn-font-size-sm,
//    $btn-border-radius-sm);
//}
</style>
