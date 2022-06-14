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
        <h3 class="mb-6">{{ application.title }}</h3>
        <div class="relative grid gap-12 md:grid-cols-2">
          <div>
            <img :src="application.image.src" :alt="application.image.alt" />
          </div>
          <div
            class="top-[8rem] self-start justify-self-start rounded-md border bg-primary-100 p-6 shadow-md md:sticky"
          >
            <div class="text-lg">{{ $t('applications.components_used') }}:</div>
            <c-list type="bullet" class="mt-2 space-y-1">
              <c-list-item
                v-for="(
                  component, componentIndex
                ) in application.components_used"
                :key="componentIndex"
              >
                {{ component }}
              </c-list-item>
            </c-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/ui/BreadCrumbs'
import { getApplication } from '~/api/application'
import CList from '~/components/ui/List'
import CListItem from '~/components/ui/ListItem'
export default {
  name: 'Applications',
  components: { CListItem, CList, BreadCrumbs },
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
            ),
            components_used: this.$_get(item, `components_used`, []).map(
              (component) =>
                this.$_get(component, this.$i18n.localeProperties.dataKey)
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
