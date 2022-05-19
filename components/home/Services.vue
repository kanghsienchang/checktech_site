<template>
  <div class="feature-and-services">
    <div
      class="relative z-10 mt-8 bg-[url('@/assets/images/services.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:z-10 before:bg-[#1e222866]"
      :class="[
        {
          'bg-fixed': fixedBg
        }
      ]"
      style="clip-path: polygon(0 2rem, 100% 0, 100% calc(100% - 2rem), 0 100%)"
    >
      <div class="main-container relative z-20 py-32 text-white">
        <div class="feature-and-services__content w-80">
          <h2
            class="mb-4 bg-none bg-clip-content text-white before:bg-white before:bg-none"
          >
            能力與服務
          </h2>
          <h4 class="mb-6 text-white">提供各式方案客製化專業建議</h4>
          <list type="check" class="grid auto-cols-max grid-cols-2 gap-4">
            <list-item v-for="service of services" :key="service.key">
              <template #icon>
                <font-awesome-icon icon="circle-arrow-right" />
              </template>
              {{ service.label }}
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
  data() {
    return {
      fixedBg: false,
      services: [
        { key: 'connector', label: '連結器' },
        { key: 'switch', label: '開關' },
        { key: 'wire', label: '線材' },
        { key: 'electronic_components', label: '電子零組件' }
      ]
    }
  },
  mounted() {
    this.fixedBg = !this.$device.isMobileOrTablet
    this.$gsap
      .timeline({
        scrollTrigger: {
          markers: this.$showScrollMarker,
          trigger: '.feature-and-services',
          start: 'top+=300px bottom'
        }
      })
      .from('.feature-and-services__content', {
        duration: 0.7,
        opacity: 0,
        x: 30
      })
  }
}
</script>

<style scoped lang="scss"></style>
