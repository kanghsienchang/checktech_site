<template>
  <div class="">
    <div
      v-lazy:background-image="applicationData.header.image.src"
      class="bg-image-overlay-40 bg-cover bg-center bg-no-repeat"
    >
      <div class="main-container">
        <div class="py-28 text-white lg:w-8/12 xl:w-5/12">
          <h1 class="mb-6 text-inherit">{{ applicationData.header.title }}</h1>
          <p class="leading-[1.8]">
            {{ applicationData.header.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="main-container">
      <bread-crumbs :items="crumbs" class="my-12" />
      <div
        v-for="(application, index) in applicationData.items"
        :key="index"
        class="mb-20"
      >
        <h4 class="mb-6">{{ application.title }}</h4>
        <div class="flex">
          <div class="md:w-1/2">
            <img v-lazy="application.image.src" :alt="application.image.alt" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/ui/BreadCrumbs'
import { getApplication } from '~/api/application'
export default {
  name: 'Applications',
  components: { BreadCrumbs },
  data() {
    return {
      rawData: null
    }
  },
  async fetch() {
    await this.getApplication()
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
          label: this.$t('route.application')
        }
      ]
    },
    applicationData() {
      return {
        header: {
          title: this.$_get(
            this.rawData,
            `attributes.header_title.${this.$i18n.localeProperties.dataKey}`
          ),
          description: this.$_get(
            this.rawData,
            `attributes.header_description.${this.$i18n.localeProperties.dataKey}`
          ),
          image: {
            src: this.$toCDN(
              this.$_get(
                this.rawData,
                'attributes.header_image.data.attributes.url'
              )
            ),
            alt: this.$_get(
              this.rawData,
              'attributes.header_image.data.attributes.alternativeText'
            )
          }
        },
        items: this.$_get(this.rawData, 'attributes.application_items', []).map(
          (item) => ({
            image: {
              src: this.$toCDN(this.$_get(item, 'image.data.attributes.url')),
              alt: this.$_get(item, 'image.data.attributes.alternativeText')
            },
            title: this.$_get(
              item,
              `title.${this.$i18n.localeProperties.dataKey}`
            ),
            description: this.$_get(
              item,
              `description.${this.$i18n.localeProperties.dataKey}`
            )
          })
        )
      }
    }
  },
  methods: {
    async getApplication() {
      const { data } = await getApplication(this.$axios, {
        populate: 'deep,3'
      })
      this.rawData = data
    }
  }
}
</script>

<style scoped></style>
