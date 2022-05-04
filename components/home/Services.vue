<template>
  <div class="feature-and-services main-container">
    <h2>能力與服務</h2>
    <div class="services mt-8 flex pb-4">
      <div class="relative w-1/2">
        <figure class="rounded-md overflow-hidden">
          <img
            src="@/assets/images/features.png"
            alt="Features and Services"
            class="max-w-full max-h-full object-cover"
          >
        </figure>
        <div class="absolute content-[''] inset-0 bg-primary-l translate-y-4 translate-x-4 -z-10 rounded-md" />
      </div>
      <div class="w-1/2 flex justify-center">
        <div>
          <h3 class="mb-8">
            提供各式方案客製化專業建議
          </h3>
          <list
            type="check"
            class="grid grid-cols-2 gap-8"
          >
            <list-item
              v-for="service of services"
              :key="service.key"
            >
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
