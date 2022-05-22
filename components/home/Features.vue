<template>
  <div class="features relative overflow-hidden">
    <div
      class="absolute top-0 right-0 h-8 w-60 translate-y-2 -skew-y-2 -skew-x-2 bg-cyan-200/70"
    />
    <div
      class="absolute top-0 right-0 h-6 w-52 translate-y-7 -translate-x-2 rotate-1 -skew-y-2 -skew-x-3 bg-blue-400/70"
    />
    <div class="main-container flex justify-between">
      <div
        v-for="feature of features"
        :key="feature.key"
        class="features__feature flex w-52 flex-col gap-4"
      >
        <div
          class="flex h-14 w-14 items-center justify-center rounded-md bg-primary-100"
        >
          <font-awesome-icon
            :icon="feature.icon"
            class="text-primary-500"
            size="xl"
          />
        </div>
        <h5>{{ feature.label }}</h5>
        <p>
          {{ feature.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Features',
  data() {
    return {
      animation: null,
      features: [
        {
          key: 'fast_response',
          label: '回覆迅速',
          icon: 'business-time',
          description:
            '我們有各項專業人員，為您解答產品的問題，與您共同研究與討論'
        },
        {
          key: 'flexible_shipping',
          label: '彈性出貨',
          icon: 'truck',
          description:
            '我們有數個集貨區，可以為您備貨，讓您的產品很快的到達你身旁'
        },
        {
          key: 'legit_warranty',
          label: '合理保固',
          icon: 'clipboard-check',
          description:
            '我們提供良好的品質，更有完善的保固服務，您可以放心交給我們'
        },
        {
          key: 'from_the_heart',
          label: '從心出發',
          icon: 'hand-holding-heart',
          description:
            '我們是您可信賴的夥伴，用心服務每一位客戶，解決您的產品問題'
        }
      ]
    }
  },
  mounted() {
    this.animation = this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.features',
          start: 'top+=300px bottom'
        }
      })
      .from('.features__feature', {
        duration: 0.4,
        opacity: 0,
        x: 30,
        stagger: 0.25
      })
  },
  beforeDestroy() {
    this.animation.kill()
  }
}
</script>

<style scoped></style>
