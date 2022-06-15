<template>
  <div class="quality-assurance my-16 md:my-20">
    <div class="main-container flex flex-col gap-12 lg:flex-row">
      <div class="quality-assurance__content lg:w-1/2">
        <h2 class="mb-3">{{ data.title_1 }}</h2>
        <h4 class="mb-6">{{ data.title_2 }}</h4>
        <div>
          <div>
            <p>
              {{ data.description }}
            </p>
            <list class="mt-6 flex flex-col gap-6" type="check">
              <list-item v-for="(item, index) in data.items" :key="index">
                {{ item }}
              </list-item>
            </list>
          </div>
        </div>
      </div>
      <div class="quality-assurance__image relative flex flex-wrap lg:w-1/2">
        <div
          class="dotted-bg absolute top-[3rem] right-[3rem] -z-10 h-32 w-32 bg-[length:0.75rem_0.75rem] opacity-75"
        />
        <figure class="z-10 w-[75%] overflow-hidden rounded-md">
          <img
            v-lazy="data.image_left.src"
            :alt="data.image_left.alt"
            class="h-full object-cover"
          />
        </figure>
        <figure class="ml-[30%] -mt-[25%] w-[70%] overflow-hidden rounded-md">
          <img
            v-lazy="data.image_right.src"
            :alt="data.image_left.alt"
            class="h-full object-cover"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import List from '~/components/ui/List'
import ListItem from '~/components/ui/ListItem'
export default {
  name: 'QualityAssurance',
  components: { ListItem, List },
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
          markers: this.$showScrollMarker,
          trigger: '.quality-assurance',
          start: 'top+=50px bottom'
        }
      })
      .from('.quality-assurance__content', {
        duration: 0.7,
        opacity: 0,
        y: 30
      })
      .from(
        '.quality-assurance__image',
        {
          duration: 0.7,
          opacity: 0,
          y: 30
        },
        '<+=50%'
      )
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped lang="scss">
.dotted-bg {
  background-image: radial-gradient(
    theme('colors.primary.500') 2px,
    transparent 0
  );
}
</style>
