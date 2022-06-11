<template>
  <div class="products main-container-padded">
    <bread-crumbs :items="crumbs" class="mb-8" />
    <div>
      <c-form ref="productCategory" class="max-w-xs">
        <c-form-item :label="$t('products.product_categories')">
          <c-select
            :value="selectedProductCategoryKey"
            :options="categoryOptions"
            @input="handleSelectProductCategory"
          />
        </c-form-item>
      </c-form>
      <div v-if="categoryDescription" class="mb-8">
        <p class="whitespace-pre-wrap" v-text="categoryDescription" />
      </div>
      <c-tabs
        :value="selectedTypeKey"
        :items="tabItems"
        class="mb-6"
        @input="handleTabChange"
      />
      <div class="-mx-2 flex flex-wrap md:-mx-3">
        <div
          v-for="product in productList"
          :key="product.key"
          class="w-1/2 px-2 pb-4 md:w-1/3 md:px-3 md:pb-6 xl:w-1/4"
        >
          <product-list-card
            class="h-full"
            :link="localePath(`/products/${product.key}`)"
            :image-alt="product.image.alt"
            :image-src="product.image.src"
            :name="product.name"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from '~/components/ui/BreadCrumbs'
import CForm from '~/components/ui/Form'
import CFormItem from '~/components/ui/FormItem'
import CSelect from '~/components/ui/Select'
import {
  getProductCategories,
  getProducts,
  getProductTypes
} from '~/api/products'
import CTabs from '~/components/ui/Tabs'
import ProductListCard from '~/components/products/ProductListCard'
export default {
  name: 'Products',
  components: {
    ProductListCard,
    CTabs,
    CSelect,
    CFormItem,
    CForm,
    BreadCrumbs
  },
  data() {
    return {
      products: [],
      productTypes: [],
      productCategories: [],
      selectedProductCategoryKey: '',
      selectedTypeKey: ''
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
          label: this.$t('page.products')
        }
      ]
    },
    categoryOptions() {
      return [
        {
          label: this.$t('common.all'),
          value: 'all'
        },
        ...this.productCategories.map((category) => ({
          label:
            category?.attributes?.name?.[this.$i18n.localeProperties.dataKey],
          value: category?.attributes?.key
        }))
      ]
    },
    selectedCategory() {
      return this.getCategoryByKey(this.selectedProductCategoryKey)
    },
    categoryDescription() {
      return this.selectedCategory?.attributes?.description?.[
        this.$i18n.localeProperties.dataKey
      ]
    },
    tabItems() {
      return [
        {
          label: this.$t('common.all'),
          value: 'all',
          link: { query: {} }
        },
        ...this.productTypes?.map((productType) => {
          return {
            label:
              productType?.attributes?.name[
                this.$i18n.localeProperties.dataKey
              ],
            value: productType?.attributes?.key,
            link: {
              query: {
                category: this.selectedProductCategoryKey,
                type: productType?.attributes?.key
              }
            }
          }
        })
      ]
    },
    productList() {
      return this.products.map((product) => ({
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
    }
  },
  watch: {
    async '$route.query.category'() {
      await this.handleSelectProductCategory(
        this.$route.query.category || 'all'
      )
    }
  },
  async mounted() {
    await this.getProductCategories()
    const categoryQuery = this.$route.query.category
    if (this.getCategoryByKey(categoryQuery)) {
      this.selectedProductCategoryKey = categoryQuery
    } else {
      this.selectedProductCategoryKey = 'all'
      if (categoryQuery) {
        await this.$router.replace({ query: {} })
      }
    }
    await this.getProductTypes()
    const typeQuery = this.$route.query.type
    if (this.getTypeByKey(typeQuery)) {
      this.selectedTypeKey = typeQuery
    } else {
      this.selectedTypeKey = 'all'
      if (typeQuery) {
        await this.$router.replace({
          query: { category: this.selectedProductCategoryKey }
        })
      }
    }
    await this.getProducts()
  },
  methods: {
    getCategoryByKey(categoryKey) {
      return this.productCategories.find((category) => {
        return category?.attributes?.key === categoryKey
      })
    },
    getTypeByKey(typeKey) {
      return this.productTypes.find((type) => {
        return type?.attributes?.key === typeKey
      })
    },
    async handleSelectProductCategory(val) {
      this.selectedProductCategoryKey = val
      await this.$router.push({
        query:
          val === 'all'
            ? {}
            : {
                category: val
              }
      })
      this.productTypes = []
      this.products = []
      await this.getProductTypes()
      await this.getProducts()
    },
    async handleTabChange(val) {
      this.selectedTypeKey = val
      await this.$router.push({
        query: {
          category: this.selectedProductCategoryKey,
          type: this.selectedTypeKey
        }
      })
      this.products = []
      await this.getProducts()
    },
    async getProductCategories() {
      const { data } = await getProductCategories(this.$axios, {
        pagination: {
          limit: '-1'
        },
        populate: ['name', 'description', 'product_types'],
        sort: ['id:desc']
      })
      this.productCategories = data
    },
    async getProductTypes() {
      if (this.selectedProductCategoryKey !== 'all') {
        const { data } = await getProductTypes(this.$axios, {
          pagination: {
            limit: '-1'
          },
          populate: ['name'],
          filters: {
            product_category: {
              key: this.selectedProductCategoryKey
            }
          }
        })
        this.productTypes = data
      }
      this.selectedTypeKey = 'all'
    },
    async getProducts() {
      const filters = {}
      if (this.selectedProductCategoryKey !== 'all') {
        this.$_set(
          filters,
          'product_type.product_category.key',
          this.selectedProductCategoryKey
        )
      }
      if (this.selectedTypeKey !== 'all') {
        this.$_set(filters, 'product_type.key', this.selectedTypeKey)
      }
      const { data } = await getProducts(this.$axios, {
        populate: ['name', 'images'],
        sort: ['id:desc'],
        filters
      })
      this.products = data
    }
  }
}
</script>

<style scoped></style>
