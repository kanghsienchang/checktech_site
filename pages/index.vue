<template>
  <div class="home">
    <home-header :data="headerData" />
    <about-us :data="aboutUsData" />
    <statistics :data="statisticsData" />
    <service-map :data="serviceMapData" />
    <product-categories :data="productCategoriesData" />
    <vendors :data="vendorsData" />
    <services :data="servicesData" />
    <features :data="featuresData" />
    <quality-assurance :data="qualityData" />
    <contact-us :data="contactUsData" />
  </div>
</template>

<script>
import Header from '~/components/home/Header'
import Vendors from '~/components/home/Vendors'
import Services from '~/components/home/Services'
import Features from '~/components/home/Features'
import QualityAssurance from '~/components/home/QualityAssurance'
import AboutUs from '~/components/home/AboutUs'
import Statistics from '~/components/home/Statistics'
import ServiceMap from '~/components/home/ServiceMap'
import ContactUs from '~/components/home/ContactUs'
import { getHome } from '~/api/home'
import ProductCategories from '~/components/home/ProductCategories'
export default {
  name: 'Index',
  components: {
    ProductCategories,
    ContactUs,
    ServiceMap,
    Statistics,
    AboutUs,
    QualityAssurance,
    Features,
    Services,
    Vendors,
    HomeHeader: Header
  },
  async asyncData({ $axios }) {
    const { data: rawData } = await getHome($axios, {
      populate: 'deep,4'
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
    headerData() {
      return {
        title_1: this.$_get(
          this.rawData,
          `attributes.header_title_1.${this.$i18n.localeProperties.dataKey}`
        ),
        title_2: this.$_get(
          this.rawData,
          `attributes.header_title_2.${this.$i18n.localeProperties.dataKey}`
        ),
        description: this.$_get(
          this.rawData,
          `attributes.header_description.${this.$i18n.localeProperties.dataKey}`
        ),
        video: {
          poster: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.header_video_poster.data.attributes.url'
            )
          ),
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.header_video.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.header_video.data.attributes.alternativeText'
          )
        }
      }
    },
    aboutUsData() {
      return {
        title_1: this.$_get(
          this.rawData,
          `attributes.about_us_title_1.${this.$i18n.localeProperties.dataKey}`
        ),
        title_2: this.$_get(
          this.rawData,
          `attributes.about_us_title_2.${this.$i18n.localeProperties.dataKey}`
        ),
        description: this.$_get(
          this.rawData,
          `attributes.about_us_description.${this.$i18n.localeProperties.dataKey}`
        ),
        experience: this.$_get(this.rawData, 'attributes.about_us_experience'),
        image_top_left: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.about_us_image_top_left.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.about_us_image_top_left.data.attributes.alternativeText'
          )
        },
        image_bottom_left: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.about_us_image_bottom_left.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.about_us_image_bottom_left.data.attributes.alternativeText'
          )
        },
        image_right: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.about_us_image_right.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.about_us_image_right.data.attributes.alternativeText'
          )
        }
      }
    },
    statisticsData() {
      return {
        title: this.$_get(
          this.rawData,
          `attributes.statistics_title.${this.$i18n.localeProperties.dataKey}`
        ),
        items: this.$_get(this.rawData, `attributes.statistics_items`, []).map(
          (item) => ({
            icon: item.icon,
            suffix: item.suffix,
            value: item.value,
            label: this.$_get(
              item,
              `label.${this.$i18n.localeProperties.dataKey}`
            )
          })
        )
      }
    },
    serviceMapData() {
      return {
        title_1: this.$_get(
          this.rawData,
          `attributes.service_map_title_1.${this.$i18n.localeProperties.dataKey}`
        ),
        title_2: this.$_get(
          this.rawData,
          `attributes.service_map_title_2.${this.$i18n.localeProperties.dataKey}`
        )
      }
    },
    productCategoriesData() {
      return {
        title_1: this.$_get(
          this.rawData,
          `attributes.product_categories_title_1.${this.$i18n.localeProperties.dataKey}`
        ),
        title_2: this.$_get(
          this.rawData,
          `attributes.product_categories_title_2.${this.$i18n.localeProperties.dataKey}`
        ),
        items: this.$_get(
          this.rawData,
          `attributes.product_categories_items`,
          []
        ).map((item) => ({
          title: this.$_get(
            item,
            `product_category.data.attributes.name.${this.$i18n.localeProperties.dataKey}`
          ),
          description: this.$_get(
            item,
            `description.${this.$i18n.localeProperties.dataKey}`
          ),
          link: this.localePath({
            path: '/products',
            query: {
              category: this.$_get(item, `product_category.data.attributes.key`)
            }
          }),
          background: {
            src: this.$toCDN(
              this.$_get(item, 'background.data.attributes.url')
            ),
            alt: this.$_get(item, 'background.data.attributes.alternativeText')
          }
        }))
      }
    },
    vendorsData() {
      return {
        title: this.$_get(
          this.rawData,
          `attributes.vendors_title.${this.$i18n.localeProperties.dataKey}`
        ),
        items: this.$_get(this.rawData, `attributes.vendors_items`, []).map(
          (item) => ({
            link: this.$_get(item, `external_url`),
            image: {
              src: this.$toCDN(this.$_get(item, 'image.data.attributes.url')),
              alt: this.$_get(item, 'image.data.attributes.alternativeText')
            }
          })
        )
      }
    },
    servicesData() {
      return {
        title_1: this.$_get(
          this.rawData,
          `attributes.services_title_1.${this.$i18n.localeProperties.dataKey}`
        ),
        title_2: this.$_get(
          this.rawData,
          `attributes.services_title_2.${this.$i18n.localeProperties.dataKey}`
        ),
        background: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.services_background_image.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.services_background_image.data.attributes.alternativeText'
          )
        },
        items: this.$_get(this.rawData, `attributes.services_items`, []).map(
          (item) => this.$_get(item, `${this.$i18n.localeProperties.dataKey}`)
        )
      }
    },
    featuresData() {
      return {
        items: this.$_get(this.rawData, `attributes.features_items`, []).map(
          (item) => ({
            icon: item.icon,
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
    },
    qualityData() {
      return {
        title_1: this.$_get(
          this.rawData,
          `attributes.quality_assurance_title_1.${this.$i18n.localeProperties.dataKey}`
        ),
        title_2: this.$_get(
          this.rawData,
          `attributes.quality_assurance_title_2.${this.$i18n.localeProperties.dataKey}`
        ),
        description: this.$_get(
          this.rawData,
          `attributes.quality_assurance_description.${this.$i18n.localeProperties.dataKey}`
        ),
        image_left: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.quality_assurance_image_left.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.quality_assurance_image_left.data.attributes.alternativeText'
          )
        },
        image_right: {
          src: this.$toCDN(
            this.$_get(
              this.rawData,
              'attributes.quality_assurance_image_right.data.attributes.url'
            )
          ),
          alt: this.$_get(
            this.rawData,
            'attributes.quality_assurance_image_right.data.attributes.alternativeText'
          )
        },
        items: this.$_get(
          this.rawData,
          `attributes.quality_assurance_items`,
          []
        ).map((item) =>
          this.$_get(item, `${this.$i18n.localeProperties.dataKey}`)
        )
      }
    },
    contactUsData() {
      return {
        title: this.$_get(
          this.rawData,
          `attributes.contact_us_title.${this.$i18n.localeProperties.dataKey}`
        ),
        description: this.$_get(
          this.rawData,
          `attributes.contact_us_description.${this.$i18n.localeProperties.dataKey}`
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
//.content {
//  //@apply py-20 pb-32 md:py-24 md:pb-40;
//  & > *:not(:first-child) {
//    @apply pt-16 md:pt-20;
//  }
//}
</style>
