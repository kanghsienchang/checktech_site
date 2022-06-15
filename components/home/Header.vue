<template>
  <section id="home-header" class="header relative h-screen py-16 md:py-20">
    <video
      :poster="data.video.poster"
      :src="data.video.src"
      class="absolute top-0 left-0 h-full w-full max-w-full object-cover"
      playsinline
      autoplay
      loop
      muted
    />
    <div class="absolute inset-0 bg-black/[0.4]" />
    <div class="header__content absolute inset-0 z-10">
      <div class="main-container h-full">
        <div class="flex h-full flex-col justify-center text-white xl:w-1/2">
          <div class="header__top">
            <h1 class="tracking-wider text-current">{{ data.title_1 }}</h1>
            <h1 class="mt-2 tracking-wider text-current">{{ data.title_2 }}</h1>
          </div>
          <p class="header__middle mt-6 text-base tracking-wide lg:text-lg">
            {{ data.description }}
          </p>
          <div class="header__bottom mt-8 w-full">
            <c-button
              :to="localePath('contact-us')"
              color="white"
              size="lg"
              pill
              translate-on-hover
              outline
            >
              {{ $t('route.contact_us') }}
            </c-button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 bottom-[2.5%] z-10 animate-bounce text-center text-white opacity-75"
    >
      <font-awesome-icon icon="angles-down" size="xl" />
      <div class="text-sm">{{ $t('home.scroll') }}</div>
    </div>
  </section>
</template>

<script>
import CButton from '~/components/ui/Button'
export default {
  name: 'Header',
  components: { CButton },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
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

<style scoped lang="scss"></style>
