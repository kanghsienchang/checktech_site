<template>
  <div class="feature-and-services">
    <div class="main-container">
      <h2>
        能力與服務
      </h2>
    </div>
    <div
      class="mt-8 relative z-0 bg-[url('@/assets/images/services.jpg')] bg-cover bg-no-repeat bg-center before:absolute before:inset-0 before:bg-[#1e222866] before:z-10"
      :class="[{
        'bg-fixed': !$device.isMobileOrTablet
      }]"
    >
      <div class="absolute border-l-[100vw] border-l-transparent bottom-0 right-0 border-b-[2rem] border-b-light z-20"></div>
      <div class="relative main-container py-32 text-white z-20">
        <div class="w-80">
          <h3 class="mb-8 text-white">
            提供各式方案客製化專業建議
          </h3>
          <list
            type="check"
            class="grid grid-cols-2 gap-4"
          >
            <list-item
              v-for="service of services"
              :key="service.key"
            >
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
  data () {
    return {
      services: [
        { key: 'connector', label: '連結器' },
        { key: 'switch', label: '開關' },
        { key: 'wire', label: '線材' },
        { key: 'electronic_components', label: '電子零組件' }
      ]
    }
  }
}
</script>

<style scoped
       lang="scss"
>
</style>
