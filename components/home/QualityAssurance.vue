<template>
  <div class="quality-assurance my-16 md:my-20">
    <div class="main-container flex flex-col gap-12 md:flex-row">
      <div class="quality-assurance__content md:w-1/2">
        <h2 class="mb-3">品質要求</h2>
        <h4 class="mb-6">致力於全球化佈局策略 符合國際標準</h4>
        <div>
          <div>
            <p>
              本公司致力於全球化佈局策略，尤以環保是市場所趨，生產皆符合環保標準
            </p>
            <list class="mt-6 flex flex-col gap-6" type="check">
              <list-item> 通過 ISO 9001:2015 質量體系認證 </list-item>
              <list-item>
                全面導入無鉛製程產品，以符合歐盟RoHS之要求
              </list-item>
              <list-item>
                所有產品所含金屬皆符合無衝突規範 (DRC Conflict-Free)
              </list-item>
            </list>
          </div>
        </div>
      </div>
      <div class="quality-assurance__image relative flex flex-wrap md:w-1/2">
        <div
          class="dotted-bg absolute top-[3rem] right-[3rem] -z-10 h-32 w-32 bg-[length:0.75rem_0.75rem] opacity-75"
        />
        <figure class="z-10 w-[75%] overflow-hidden rounded-md">
          <img
            v-lazy="'/images/quality-assurance/image1.jpg'"
            alt="Quality assurance 1"
            class="h-full object-cover"
          />
        </figure>
        <figure class="ml-[30%] -mt-[25%] w-[70%] overflow-hidden rounded-md">
          <img
            v-lazy="'/images/quality-assurance/image2.jpeg'"
            alt="Quality assurance 2"
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
          start: 'top+=300px bottom'
        }
      })
      .from('.quality-assurance__image', {
        duration: 0.7,
        opacity: 0,
        y: 30
      })
      .from(
        '.quality-assurance__content',
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
