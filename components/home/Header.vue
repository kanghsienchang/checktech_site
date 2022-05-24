<template>
  <section id="home-header" class="header relative min-h-[100vh]">
    <video
      src="@/assets/videos/header.mp4"
      class="absolute top-0 left-0 h-full w-full max-w-full object-cover"
      playsinline
      autoplay
      loop
      muted
    />
    <div class="absolute inset-0 bg-black/[0.4]" />
    <div
      class="header__content main-container absolute inset-0 z-10 flex flex-col items-start justify-center text-white"
    >
      <div class="header__top">
        <h1 class="text-current">專業與創新</h1>
        <h1 class="mt-3 text-current">我們是您最好的選擇</h1>
      </div>
      <p class="header__middle mt-6 text-base lg:text-lg">
        提供您「一次購足」的電子零組件開發與客製化專業建議
      </p>
      <div class="header__bottom mt-6">
        <c-button
          to="/contact-us"
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
    <div
      class="absolute inset-x-0 bottom-20 z-10 animate-bounce text-center text-white opacity-75"
    >
      <font-awesome-icon icon="angles-down" size="xl" />
      <div class="text-sm">Scroll</div>
    </div>
  </section>
</template>

<script>
import CButton from '~/components/ui/Button'
export default {
  name: 'Header',
  components: { CButton },
  data() {
    return {
      animation: null
    }
  },
  mounted() {
    this.animation = this.$gsap
      .timeline({
        scrollTrigger: {
          trigger: '.header',
          start: 'top bottom',
          markers: this.$showScrollMarker
        }
      })
      .from('.header__top', { y: -50, duration: 0.7, opacity: 0 })
      .from('.header__middle', { x: 30, duration: 0.7, opacity: 0 })
      .from('.header__bottom', { y: 30, duration: 0.7, opacity: 0 }, '<+=50%')
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped></style>
