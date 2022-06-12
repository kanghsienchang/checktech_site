<template>
  <div class="esg">
    <div
      v-lazy:background-image="esg.header_image.src"
      class="flex items-center bg-cover bg-left bg-no-repeat text-white"
    >
      <div class="main-container py-20 md:py-32">
        <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12">
          <h1 class="mb-6 text-inherit">{{ esg.header_title_1 }}</h1>
          <h4 class="mb-6 text-inherit">{{ esg.header_title_2 }}</h4>
          <p class="leading-[1.8]">{{ esg.header_description }}</p>
        </div>
      </div>
    </div>
    <div class="main-container mt-12 mb-16">
      <bread-crumbs :items="crumbs" class="mb-8" />
      <div class="grid gap-12 lg:grid-cols-2">
        <div class="space-y-8">
          <div v-for="(point, index) in esg.points" :key="index">
            <h5 class="mb-1 text-primary-500">{{ point.title }}</h5>
            <p>{{ point.description }}</p>
          </div>
        </div>
        <div class="flex flex-wrap content-center">
          <div class="h-[15rem] w-5/12 pt-4 pl-4 pb-4">
            <img
              v-lazy="esg.points_image_top_left.src"
              :alt="esg.points_image_top_left.alt"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
          <div class="h-[15rem] w-7/12 pb-4 pl-4">
            <img
              v-lazy="esg.points_image_top_right.src"
              :alt="esg.points_image_top_right.alt"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
          <div class="h-[15rem] w-7/12 pb-4 pr-4">
            <img
              v-lazy="esg.points_image_bottom_left.src"
              :alt="esg.points_image_bottom_left.alt"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
          <div class="h-[15rem] w-5/12 pr-4">
            <img
              v-lazy="esg.points_image_bottom_right.src"
              :alt="esg.points_image_bottom_right.alt"
              class="h-full w-full rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getESG } from '~/api/esg'
import BreadCrumbs from '~/components/ui/BreadCrumbs'

export default {
  name: 'ESG',
  components: { BreadCrumbs },
  async asyncData({ $axios }) {
    const { data: rawData } = await getESG($axios, {
      populate: 'deep,3'
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
          label: this.esg.header_title_1
        }
      ]
    },
    esg() {
      return {
        header_image: {
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
        },
        header_title_1: this.$_get(
          this.rawData,
          `attributes.header_title_1.${this.$i18n.localeProperties.dataKey}`
        ),
        header_title_2: this.$_get(
          this.rawData,
          `attributes.header_title_2.${this.$i18n.localeProperties.dataKey}`
        ),
        header_description: this.$_get(
          this.rawData,
          `attributes.header_description.${this.$i18n.localeProperties.dataKey}`
        ),
        points:
          this.rawData?.attributes?.points?.map((point) => ({
            title: this.$_get(
              point,
              `title.${this.$i18n.localeProperties.dataKey}`
            ),
            description: this.$_get(
              point,
              `description.${this.$i18n.localeProperties.dataKey}`
            )
          })) || [],
        points_image_top_left: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.points_image_top_left.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.points_image_top_left.data.attributes.alternativeText'
          )
        },
        points_image_top_right: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.points_image_top_right.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.points_image_top_right.data.attributes.alternativeText'
          )
        },
        points_image_bottom_left: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.points_image_bottom_left.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.points_image_bottom_left.data.attributes.alternativeText'
          )
        },
        points_image_bottom_right: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.points_image_bottom_right.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.points_image_bottom_right.data.attributes.alternativeText'
          )
        }
      }
    }
  }
}
</script>

<style scoped></style>
