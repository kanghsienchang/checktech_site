<template>
  <div class="contact-us bg-slate-50 py-16 md:py-20">
    <div
      class="main-container flex flex-col items-center justify-center space-y-6 text-center"
    >
      <h3
        class="bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent"
      >
        {{ data.title }}
      </h3>
      <p>
        {{ data.description }}
      </p>
      <nuxt-link
        :to="localePath('contact-us')"
        class="gradient-button relative rounded-md border border-transparent py-2.5 px-6"
      >
        <span
          class="linear-primary bg-clip-text text-lg font-medium text-transparent"
        >
          {{ $t('route.contact_us') }}
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="scss">
.gradient-button {
  background: linear-gradient(#f9fbfd, #f9fbfd) padding-box,
    linear-gradient(90deg, #3a7bd5, #223d9d) border-box;
}
</style>
