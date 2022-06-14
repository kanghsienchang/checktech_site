<template>
  <div class="feature-and-services mt-20 md:mt-24">
    <div
      v-lazy:background-image="data.background.src"
      class="bg-image-overlay-40 relative mt-8 bg-cover bg-center bg-no-repeat before:absolute"
      :class="[
        {
          'bg-fixed': fixedBg
        }
      ]"
      :style="{
        clipPath: 'polygon(0 1rem,100% 0, 100% calc(100% - 1rem),0 100%)'
      }"
    >
      <div class="main-container relative z-20 py-28 text-white md:py-32">
        <div class="feature-and-services__content md:w-2/3 xl:w-1/2">
          <h2
            class="mb-4 bg-none bg-clip-content text-white before:bg-white before:bg-none"
          >
            {{ data.title_1 }}
          </h2>
          <h4 class="mb-6 text-white">{{ data.title_2 }}</h4>
          <list type="check" class="inline-grid grid-cols-2 gap-4">
            <list-item v-for="(label, index) of data.items" :key="index">
              <template #icon>
                <font-awesome-icon icon="circle-arrow-right" />
              </template>
              {{ label }}
            </list-item>
          </list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '~/components/ui/List'
import ListItem from '~/components/ui/ListItem'

export default {
  name: 'Services',
  components: { ListItem, List },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      animation: null,
      fixedBg: false
    }
  },
  mounted() {
    this.fixedBg = !this.$device.isMobileOrTablet
    this.animation = this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.feature-and-services',
          start: 'top+=200px bottom'
        }
      })
      .from('.feature-and-services__content', {
        duration: 0.7,
        opacity: 0,
        x: 30
      })
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped lang="scss"></style>
