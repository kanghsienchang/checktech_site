<template>
  <div
    class="error main-container flex flex-col items-center justify-center self-stretch"
  >
    <div class="text-center">
      <h1 class="mb-6 text-9xl">{{ errorObject.code }}</h1>
      <div class="mb-6 text-xl font-medium">
        {{ errorObject.message }}
      </div>
      <c-button :to="localePath('index')" class="w-full">
        {{ $t('error.return_to_home_page') }}
      </c-button>
    </div>
  </div>
</template>

<script>
import CButton from '~/components/ui/Button'
export default {
  name: 'ErrorLayout',
  components: { CButton },
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorObject() {
      switch (this.error.statusCode) {
        case 404:
          return {
            code: this.error.statusCode,
            message: this.$t('error.page_not_found')
          }
        default:
          return {
            code: 500,
            message: this.$t('error.internal_server_error')
          }
      }
    }
  }
}
</script>

<style scoped></style>
