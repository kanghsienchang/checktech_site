<template>
  <div class="affix-items fixed right-[1rem] bottom-[1rem] z-[100]">
    <collapse-transition easing="ease-out" :duration="200">
      <div
        v-show="socialOpened"
        class="flex flex-col items-center justify-center space-y-4"
      >
        <a
          v-for="social in socials"
          :key="social.type"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="block h-12 w-12 drop-shadow-xl"
        >
          <img
            :src="`/images/socials/${social.type}.png`"
            :alt="social.type"
            class="max-h-full w-full max-w-full"
          />
        </a>
      </div>
    </collapse-transition>
    <div
      class="contact-button mt-4 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-400 text-white"
      @click="socialOpened = !socialOpened"
    >
      <font-awesome-icon v-if="socialOpened" icon="times" size="xl" />
      <!--eslint-disable vue/no-v-html-->
      <div
        v-else
        class="h-6 w-6 fill-white"
        v-html="require('@/assets/icons/headphone.svg?raw')"
      />
    </div>
  </div>
</template>

<script>
import { CollapseTransition } from '@ivanv/vue-collapse-transition'
export default {
  name: 'AffixItems',
  components: {
    CollapseTransition
  },
  props: {
    socials: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      socialOpened: false
    }
  }
}
</script>

<style scoped lang="scss">
.contact-button {
  box-shadow: 0 5px 20px 0 rgb(0 0 0 / 30%);
}
</style>
