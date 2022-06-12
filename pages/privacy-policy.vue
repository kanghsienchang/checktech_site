<template>
  <div class="privacy-policy main-container-padded">
    <bread-crumbs :items="crumbs" class="mb-8" />
    <h3 class="mb-4">{{ $t('route.privacy_policy') }}</h3>
    <!--eslint-disable vue/no-v-html-->
    <div
      class="prose prose-slate mb-8 prose-headings:mb-2 prose-headings:mt-4 prose-p:my-0 prose-a:!text-primary-500"
      v-html="privacyContent"
    />
  </div>
</template>

<script>
import { getPrivacy } from '~/api/privacy'
import BreadCrumbs from '~/components/ui/BreadCrumbs'

export default {
  name: 'PrivacyPolicy',
  components: { BreadCrumbs },
  async asyncData({ $axios }) {
    const { data: rawData } = await getPrivacy($axios, {
      populate: '*'
    })
    return {
      rawData
    }
  },
  data() {
    return {
      rawData: null
    }
  },
  computed: {
    crumbs() {
      return [
        {
          icon: 'house',
          label: this.$t('page.home'),
          path: this.localePath('index')
        },
        {
          icon: '',
          label: this.$t('route.privacy_policy')
        }
      ]
    },
    privacyContent() {
      return this.$_get(
        this.rawData,
        `attributes.content.${this.$i18n.localeProperties.dataKey}`
      )
    }
  }
}
</script>

<style scoped></style>
