<template>
  <div class="contact-us">
    <div
      class="main-container flex flex-col items-center justify-center gap-8 text-center"
    >
      <h3
        class="bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent"
      >
        準備好與我們聯繫了嗎？
      </h3>
      <p class="text-lg">
        我們很樂意為您提供協助，歡迎探索我們的產品及解決方案，留下資訊後將有專人與您聯繫。
      </p>
      <nuxt-link
        to="/contact-us"
        class="gradient-button relative rounded-md border border-transparent py-2.5 px-6"
      >
        <span
          class="linear-primary bg-clip-text text-lg font-medium text-transparent"
        >
          聯絡我們
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs'
}
</script>

<style scoped lang="scss">
.gradient-button {
  background: linear-gradient(#f9fbfd, #f9fbfd) padding-box,
    linear-gradient(90deg, #3a7bd5, #223d9d) border-box;
}
</style>
