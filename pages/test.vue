<template>
  <div class="">
    <div
      v-lazy:background-image="
        require('@/assets/images/applications/cover-test.jpeg')
      "
      class="bg-image-overlay-30 bg-cover bg-center bg-no-repeat"
    >
      <div class="main-container">
        <div class="w-1/3 py-28 text-white">
          <h1 class="mb-6 text-inherit">產品應用</h1>
          <p class="leading-[1.8]">
            本公司的重點垂直市場，包括5G電信、工業、醫療、物聯網、電源管理、綠色能源、電腦週邊設備和消費電子產品，並廣泛地使用於數位3C以及相關消費性影音,
            手持式產品。
          </p>
        </div>
      </div>
    </div>
    <div class="main-container-padded">
      <bread-crumbs :items="crumbs" class="mb-8" />
      <div class="md:w-1/2">
        <h4 class="mb-6">Calculator</h4>
        <img
          v-lazy="require('@/assets/images/applications/1.jpg')"
          class="mb-10"
        />
        <h4 class="mb-6">Smart Door Lock</h4>
        <img
          v-lazy="require('@/assets/images/applications/2.jpg')"
          class="mb-10"
        />
        <h4 class="mb-6">IoT Devices</h4>
        <img
          v-lazy="require('@/assets/images/applications/3.jpg')"
          class="mb-10"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/ui/BreadCrumbs'
export default {
  name: 'Test',
  components: { BreadCrumbs },
  computed: {
    crumbs() {
      return [
        {
          icon: 'house',
          label: this.$t('page.home'),
          path: this.localePath('index')
        },
        {
          icon: '',
          label: '產品應用',
          path: this.localePath('esg')
        }
      ]
    }
  }
}
</script>

<style scoped></style>
