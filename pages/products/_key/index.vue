<template>
  <div class="product-detail mt-8">
    <div class="main-container mb-12">
      <bread-crumbs :items="crumbs" class="mb-8" />
      <div class="grid auto-cols-fr gap-6 md:grid-cols-2 md:gap-16">
        <product-images-card
          class="h-[20rem] md:h-[30rem]"
          :images="product.images"
        />
        <div class="flex flex-col justify-start">
          <div class="flex-1">
            <h4 class="mb-6 font-medium">{{ product.name }}</h4>
            <div class="mb-16 grid grid-cols-2 gap-x-12 gap-y-8">
              <template v-for="productInfo in productInfoList">
                <div
                  v-if="productInfo.items && productInfo.items.length > 0"
                  :key="productInfo.key"
                >
                  <div class="mb-2 font-medium text-slate-500">
                    {{ productInfo.label }}
                  </div>
                  <ul class="list-inside list-disc space-y-1">
                    <li v-for="item in productInfo.items" :key="item" class="">
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </template>
            </div>
          </div>
          <div class="flex flex-wrap">
            <c-button outline class="w-full md:w-auto">
              {{ $t('products.download_catalogue') }}
            </c-button>
            <c-button
              class="mt-4 w-full flex-1 md:ml-4 md:mt-0 md:w-auto"
              icon="plus"
              :to="
                localePath({
                  path: '/contact-us',
                  query: { product: $route.params.key }
                })
              "
            >
              {{ $t('products.add_inquiry') }}
            </c-button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-slate-100">
      <div class="main-container py-10 md:py-14">
        <div class="mb-6 text-xl font-medium">
          {{ $t('products.description') }}
        </div>
        <!--eslint-disable vue/no-v-html-->
        <div
          class="whitespace-pre-wrap"
          v-html="renderMarkdown(product.description)"
        />
      </div>
    </div>
    <div v-if="relatedProducts.length" class="main-container mt-10 mb-14">
      <div class="mb-6 text-xl font-medium">
        {{ $t('products.similar_products') }}
      </div>
      <related-product-list :related-products="relatedProducts" />
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import BreadCrumbs from '~/components/ui/BreadCrumbs'
import { getProductDetail, getProducts } from '~/api/products'
import CButton from '~/components/ui/Button'
import ProductImagesCard from '~/components/products/ProductImagesCard'
import RelatedProductList from '~/components/products/RelatedProductList'
const md = new MarkdownIt('default')
export default {
  name: 'ProductDetail',
  components: { RelatedProductList, ProductImagesCard, CButton, BreadCrumbs },
  // async asyncData({ $axios, params }) {
  //   const { data: rawData } = await getProductDetail($axios, params.key, {
  //     populate: [
  //       'applications',
  //       'description',
  //       'dimensions',
  //       'features',
  //       'images',
  //       'name',
  //       'specifications'
  //     ]
  //   })
  //   const { data: rawRelatedData } = await getProducts($axios, {
  //     populate: ['name', 'images'],
  //     filters: {
  //       being_related_products: {
  //         key: params.key
  //       }
  //     }
  //   })
  //   return {
  //     rawData,
  //     rawRelatedData
  //   }
  // },
  data() {
    return {
      rawData: null,
      rawRelatedData: []
    }
  },
  async fetch() {
    const product = this.$_get(this.$nuxt, 'context.payload.product')
    if (product) {
      const relatedProducts = this.$_get(
        product,
        'attributes.related_products.data',
        []
      )
      this.rawData = product
      this.rawRelatedData = relatedProducts
    } else {
      await Promise.all([this.getProductDetail(), this.getRelatedProducts()])
    }
  },
  head() {
    return {
      title: this.product.name,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.product.name
        },
        {
          hid: 'description',
          property: 'description',
          content: this.product.description.replace(/[\n\r\s\t]+/g, '')
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.product.description.replace(/[\n\r\s\t]+/g, '')
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.product.images?.[0].src
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.product.images?.[0].src
        }
      ]
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
          label: this.$t('page.products'),
          path: this.localePath('products')
        },
        {
          icon: '',
          label: this.product.name
        }
      ]
    },
    product() {
      return {
        applications: this.getApiDataTranslation(this.rawData, 'applications'),
        description:
          this.getApiDataTranslation(this.rawData, 'description') || '',
        dimensions: this.getApiDataTranslation(this.rawData, 'dimensions'),
        features: this.getApiDataTranslation(this.rawData, 'features'),
        images: this.rawData?.attributes?.images?.data?.map((image) => {
          return {
            alt: image?.attributes?.alternativeText,
            src: this.$toCDN(image?.attributes?.url)
          }
        }),
        name: this.getApiDataTranslation(this.rawData, 'name'),
        related_products: [],
        specifications: this.getApiDataTranslation(
          this.rawData,
          'specifications'
        )
      }
    },
    relatedProducts() {
      return this.rawRelatedData.map((product) => ({
        name: product?.attributes?.name?.[this.$i18n.localeProperties.dataKey],
        key: product?.attributes?.key,
        image: {
          src: this.$toCDN(
            product?.attributes?.images?.data?.[0]?.attributes?.url
          ),
          alt: product?.attributes?.images?.data?.[0]?.attributes
            ?.alternativeText
        }
      }))
    },
    productInfoList() {
      return this.product
        ? [
            {
              key: 'features',
              label: this.$t('products.features'),
              items: this.product.features
            },
            {
              key: 'dimensions',
              label: this.$t('products.dimensions'),
              items: this.product.dimensions
            },
            {
              key: 'specifications',
              label: this.$t('products.specifications'),
              items: this.product.specifications
            },
            {
              key: 'applications',
              label: this.$t('products.applications'),
              items: this.product.applications
            }
          ]
        : []
    }
  },
  methods: {
    getApiDataTranslation(data, attributeKey) {
      const attribute = data?.attributes?.[attributeKey]
      if (!attribute) return undefined
      if (Array.isArray(attribute)) {
        return attribute.map(
          (item) => item[this.$i18n.localeProperties.dataKey]
        )
      } else {
        return attribute[this.$i18n.localeProperties.dataKey]
      }
    },
    renderMarkdown(val) {
      return md.render(val)
    },
    async getProductDetail() {
      const { data } = await getProductDetail(
        this.$axios,
        this.$route.params.key,
        {
          populate: [
            'applications',
            'description',
            'dimensions',
            'features',
            'images',
            'name',
            'specifications'
          ]
        }
      )
      this.rawData = data
    },
    async getRelatedProducts() {
      const { data } = await getProducts(this.$axios, {
        populate: ['name', 'images'],
        filters: {
          being_related_products: {
            key: this.$route.params.key
          }
        }
      })
      this.rawRelatedData = data
    }
  }
}
</script>

<style scoped lang="scss"></style>
