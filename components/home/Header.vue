<template>
  <section id="home-header" class="header min-h-[70vh] relative">
    <video
      src="@/assets/videos/header.mp4"
      class="max-w-full w-full h-full object-cover absolute top-0 left-0"
      playsinline
      autoplay
      loop
      muted
    />
    <div class="bg-[#1e222866] absolute inset-0" />
    <div class="header__content main-container absolute z-10 inset-0 flex flex-col justify-center items-start text-white">
      <div ref="header1">
        <h1 class="text-current">
          專業與創新
        </h1>
        <h1 class="mt-3 text-current">
          我們是您最好的選擇
        </h1>
      </div>
      <p ref="header2" class="mt-6 text-base lg:text-lg">
        提供您「一次購足」的電子零組件開發與客製化專業建議
      </p>
      <div ref="header3" class="mt-6">
        <c-button
          color="white"
          size="lg"
          pill
          translate-on-hover
          outline
        >
          聯絡我們
        </c-button>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import CButton from '~/components/ui/Button'
export default {
  name: 'Header',
  components: { CButton },
  head () {
    return {
      link: [
        {
          rel: 'preload',
          as: 'video',
          href: require('@/assets/videos/header.mp4')
        }
      ]
    }
  },
  mounted () {
    const tl = gsap.timeline({ defaults: { duration: 0.5, opacity: 0, stagger: 1 } })
    tl.from(this.$refs.header1, { y: '-100%' })
      .from(this.$refs.header2, { x: '25%' })
      .from(this.$refs.header3, { y: '100%' })
  }
}
</script>

<style scoped>

</style>
