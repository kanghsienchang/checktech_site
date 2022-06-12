<template>
  <div v-if="!cookieAgree" class="app-cookie">
    <div class="app-cookie__content">
      {{ $t('cookie.content') }}
      <div class="app-cookie__btn-container">
        <c-button
          size="sm"
          class="w-full whitespace-nowrap md:w-auto"
          @click="handleCookieAgree"
        >
          {{ $t('cookie.agree') }}
        </c-button>
        <nuxt-link
          class="app-cookie__link"
          aria-label="cookie policy"
          :to="localePath({ name: 'cookie-policy' })"
        >
          {{ $t('cookie.more_info') }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CButton from '~/components/ui/Button'
export default {
  name: 'AppCookie',
  components: { CButton },
  computed: {
    ...mapState({
      cookieAgree: (state) => state.cookieAgree
    })
  },
  methods: {
    handleCookieAgree() {
      this.$store.commit('setCookieAgree', true)
    }
  }
}
</script>

<style scoped lang="scss">
.app-cookie {
  @apply fixed inset-x-0 mx-auto px-4;
  animation-name: fadeInBottom;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-delay: 3s;
  @screen lg {
    max-width: 1000px;
  }
  bottom: 1.5rem;
  z-index: 1000;
  &__content {
    @apply rounded-md border border-solid border-slate-300 bg-white py-4 px-6 text-[0.9375rem];
    box-shadow: 0 5px 15px -5px #5c656b26;
    @screen md {
      @apply flex items-center;
    }
  }
  &__btn-container {
    @apply mt-3 flex items-center justify-between;
    @screen md {
      @apply ml-6 mt-0;
    }
  }
  &__link {
    @apply ml-4 block w-full cursor-pointer whitespace-nowrap text-center text-sm text-primary-500 md:w-auto;
  }
}
@keyframes fadeInBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
  }
}
</style>
