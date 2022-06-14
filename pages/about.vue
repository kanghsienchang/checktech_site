<template>
  <div class="about">
    <div
      v-lazy:background-image="aboutData.header.image.src"
      class="bg-image-overlay-30 bg-cover bg-center bg-no-repeat"
    >
      <div class="main-container">
        <div class="py-32 text-white lg:w-8/12 xl:w-5/12">
          <h1 class="mb-6 text-inherit">{{ aboutData.header.title }}</h1>
        </div>
      </div>
    </div>
    <div class="main-container mt-12 mb-12">
      <bread-crumbs :items="crumbs" />
    </div>
    <div class="main-container mb-20 md:mb-32">
      <div class="introduction grid items-center gap-16 md:grid-cols-2">
        <p
          class="whitespace-pre-wrap"
          v-text="aboutData.introduction.description"
        />
        <div class="relative self-start">
          <img
            v-lazy="aboutData.introduction.image.src"
            :alt="aboutData.introduction.image.alt"
            class="max-h-full w-full max-w-full rounded-md"
          />
          <div
            class="absolute inset-0 -z-10 translate-y-2 translate-x-2 rounded-md bg-slate-200 md:translate-y-4 md:translate-x-4"
          />
        </div>
      </div>
    </div>
    <div class="slogan mb-20 bg-slate-200 py-16 text-center md:mb-32">
      <div class="main-container">
        <p
          class="px-4 text-lg font-medium leading-relaxed md:px-0"
          v-text="aboutData.slogan"
        />
      </div>
    </div>
    <div class="main-container mb-20 md:mb-32">
      <div class="services flex justify-around">
        <div
          v-for="(service, index) in aboutData.services"
          :key="index"
          class="flex w-80 flex-col items-center px-2"
        >
          <!--eslint-disable vue/no-v-html-->
          <div
            class="icon mb-6"
            v-html="require(`@/assets/icons/${service.icon}.svg?raw`)"
          />
          <p class="text-center">{{ service.title }}</p>
        </div>
      </div>
    </div>
    <div class="main-container mb-20 md:mb-32 lg:mb-52">
      <div class="features grid gap-16 lg:grid-cols-2">
        <div class="relative order-2 self-start lg:order-none">
          <img
            v-lazy="aboutData.features.image.src"
            :alt="aboutData.features.image.alt"
            class="max-h-full w-full max-w-full rounded-md"
          />
          <div
            class="absolute inset-0 -z-10 translate-y-2 translate-x-2 rounded-md bg-slate-200 md:translate-y-4 md:translate-x-4"
          />
        </div>
        <div class="self-center">
          <h4 class="mb-4 text-primary-500">
            {{ aboutData.features.title }}
          </h4>
          <p
            class="mb-6 whitespace-pre-wrap"
            v-text="aboutData.features.description_1"
          />
          <c-list type="check" class="mb-6 inline-grid grid-cols-2 gap-6">
            <c-list-item
              v-for="(item, index) in aboutData.features.items"
              :key="index"
            >
              {{ item }}
            </c-list-item>
          </c-list>
          <p
            class="whitespace-pre-wrap"
            v-text="aboutData.features.description_2"
          />
        </div>
      </div>
    </div>
    <div class="mb-20 bg-slate-200 py-16 md:mb-32">
      <div
        class="main-container quality grid gap-16 md:grid-cols-2 xl:grid-cols-3"
      >
        <div class="xl:col-span-2">
          <h4 class="mb-4 text-primary-500">{{ aboutData.quality.title }}</h4>
          <p
            class="mb-4 whitespace-pre-wrap"
            v-text="aboutData.quality.description"
          />
          <c-list type="check" class="space-y-3">
            <c-list-item
              v-for="(item, index) in aboutData.quality.items"
              :key="index"
            >
              {{ item }}
            </c-list-item>
          </c-list>
        </div>
        <div class="lg:-mt-[30%]">
          <img
            v-lazy="aboutData.quality.image.src"
            :alt="aboutData.quality.image.alt"
            class="max-h-full max-h-full w-full"
          />
        </div>
      </div>
    </div>
    <div class="main-container mb-20 md:mb-32">
      <div class="prospect grid lg:grid-cols-2">
        <div>
          <img
            v-lazy="aboutData.prospect.image.src"
            :alt="aboutData.prospect.image.alt"
            class="max-h-full w-full max-w-full rounded-md"
          />
        </div>
        <div class="self-end lg:mb-8 lg:-ml-[15%]">
          <div class="flex space-x-8 rounded-md bg-slate-200 px-4 py-8 md:p-8">
            <!--eslint-disable vue/no-v-html-->
            <div
              class="icon hidden flex-shrink-0 self-center md:block"
              v-html="
                require(`@/assets/icons/${aboutData.prospect.icon}.svg?raw`)
              "
            />
            <div class="flex-grow">
              <h5 class="mb-2 text-primary-500">
                {{ aboutData.prospect.title }}
              </h5>
              <p
                class="whitespace-pre-wrap"
                v-text="aboutData.prospect.description"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAbout } from '~/api/about'
import BreadCrumbs from '~/components/ui/BreadCrumbs'
import CList from '~/components/ui/List'
import CListItem from '~/components/ui/ListItem'

export default {
  name: 'About',
  components: { CListItem, CList, BreadCrumbs },
  async asyncData({ $axios }) {
    const { data: rawData } = await getAbout($axios, {
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
          label: this.$t('route.about_us')
        }
      ]
    },
    aboutData() {
      return {
        header: {
          title: this.$_get(
            this.rawData,
            `attributes.header_title.${this.$i18n.localeProperties.dataKey}`
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
        introduction: {
          description: this.$_get(
            this.rawData,
            `attributes.introduction_description.${this.$i18n.localeProperties.dataKey}`
          ),
          image: {
            src: this.$toCDN(
              this.$_get(
                this.rawData,
                'attributes.introduction_image.data.attributes.url'
              )
            ),
            alt: this.$_get(
              this.rawData,
              'attributes.introduction_image.data.attributes.alternativeText'
            )
          }
        },
        slogan: this.$_get(
          this.rawData,
          `attributes.slogan.${this.$i18n.localeProperties.dataKey}`
        ),
        services: this.$_get(this.rawData, 'attributes.services', []).map(
          (service) => ({
            icon: this.$_get(service, 'icon'),
            title: this.$_get(
              service,
              `title.${this.$i18n.localeProperties.dataKey}`
            )
          })
        ),
        features: {
          title: this.$_get(
            this.rawData,
            `attributes.features_title.${this.$i18n.localeProperties.dataKey}`
          ),
          description_1: this.$_get(
            this.rawData,
            `attributes.features_description_1.${this.$i18n.localeProperties.dataKey}`
          ),
          items: this.$_get(this.rawData, 'attributes.features_items', []).map(
            (feature) =>
              this.$_get(feature, this.$i18n.localeProperties.dataKey)
          ),
          description_2: this.$_get(
            this.rawData,
            `attributes.features_description_2.${this.$i18n.localeProperties.dataKey}`
          ),
          image: {
            src: this.$toCDN(
              this.$_get(
                this.rawData,
                'attributes.features_image.data.attributes.url'
              )
            ),
            alt: this.$_get(
              this.rawData,
              'attributes.features_image.data.attributes.alternativeText'
            )
          }
        },
        quality: {
          title: this.$_get(
            this.rawData,
            `attributes.quality_title.${this.$i18n.localeProperties.dataKey}`
          ),
          description: this.$_get(
            this.rawData,
            `attributes.quality_description.${this.$i18n.localeProperties.dataKey}`
          ),
          items: this.$_get(this.rawData, 'attributes.quality_items', []).map(
            (feature) =>
              this.$_get(feature, this.$i18n.localeProperties.dataKey)
          ),
          image: {
            src: this.$toCDN(
              this.$_get(
                this.rawData,
                'attributes.quality_image.data.attributes.url'
              )
            ),
            alt: this.$_get(
              this.rawData,
              'attributes.quality_image.data.attributes.alternativeText'
            )
          }
        },
        prospect: {
          icon: this.$_get(this.rawData, 'attributes.prospect_icon'),
          title: this.$_get(
            this.rawData,
            `attributes.prospect_title.${this.$i18n.localeProperties.dataKey}`
          ),
          description: this.$_get(
            this.rawData,
            `attributes.prospect_description.${this.$i18n.localeProperties.dataKey}`
          ),
          image: {
            src: this.$toCDN(
              this.$_get(
                this.rawData,
                'attributes.prospect_image.data.attributes.url'
              )
            ),
            alt: this.$_get(
              this.rawData,
              'attributes.prospect_image.data.attributes.alternativeText'
            )
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.icon {
  &::v-deep {
    svg {
      @apply h-20 w-20;
    }
    .fill-secondary {
      @apply fill-primary-500;
    }
    .fill-primary {
      fill: theme('colors.slate.700');
    }
  }
}
</style>
