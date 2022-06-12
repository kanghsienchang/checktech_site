<template>
  <div class="contact-us main-container-padded">
    <bread-crumbs :items="crumbs" class="mb-8" />
    <div class="mx-auto max-w-screen-lg">
      <h4
        class="linear-primary mb-6 inline-block bg-clip-text text-transparent"
      >
        {{ $t('route.contact_us') }}
      </h4>
      <c-form
        ref="form"
        :model="form"
        :rules="rules"
        :disabled="env.submitLoading"
      >
        <div class="grid md:grid-cols-2 md:gap-x-8">
          <c-form-item
            class="md:col-span-2"
            :label="$t('contact_us.inquiry_type')"
            prop="inquiry_type"
          >
            <c-select v-model="form.inquiry_type" :options="inquiryOptions" />
          </c-form-item>
          <c-form-item
            :label="$t('contact_us.product_type')"
            prop="product_type"
          >
            <c-select
              :value="form.product_type"
              :option-groups="productTypeOptions"
              @input="handleProductTypeChange"
            />
          </c-form-item>
          <c-form-item :label="$t('contact_us.product')" prop="product">
            <c-select v-model="form.product" :options="productOptions" />
          </c-form-item>
          <c-form-item :label="$t('contact_us.country')" prop="country">
            <c-select v-model="form.country" :options="countryOptions" />
          </c-form-item>
          <c-form-item :label="$t('contact_us.city')" prop="city">
            <c-input v-model="form.city" />
          </c-form-item>
          <c-form-item
            :label="$t('contact_us.company_name')"
            prop="company_name"
          >
            <c-input v-model="form.company_name" />
          </c-form-item>
          <c-form-item :label="$t('contact_us.full_name')" prop="full_name">
            <c-input v-model="form.full_name" />
          </c-form-item>
          <c-form-item :label="$t('contact_us.email')" prop="email">
            <c-input v-model="form.email" type="email" />
          </c-form-item>
          <c-form-item :label="$t('contact_us.phone_no')" prop="phone_no">
            <c-input :value="form.phone_no" @input="handlePhoneInput" />
          </c-form-item>
          <c-form-item
            class="md:col-span-2"
            :label="$t('contact_us.channel_to_know_us')"
            prop="channel_to_know_us"
          >
            <c-select
              v-model="form.channel_to_know_us"
              :options="channelToKnowUsOptions"
            />
          </c-form-item>
          <c-form-item
            v-if="channelToKnowUsIsOthers"
            class="md:col-span-2"
            prop="channel_to_know_us_others"
          >
            <c-input v-model="form.channel_to_know_us_others" />
          </c-form-item>
          <c-form-item
            class="md:col-span-2"
            :label="$t('contact_us.inquiry_details')"
            prop="inquiry_details"
          >
            <c-text-area v-model="form.inquiry_details" />
          </c-form-item>
          <c-form-item class="mt-2 text-right md:col-span-2">
            <c-button
              class="w-full md:w-auto"
              :loading="env.submitLoading"
              @click="handleSubmit"
            >
              {{ $t('contact_us.submit_query') }}
            </c-button>
          </c-form-item>
          <honey-pot ref="honeypot" />
        </div>
      </c-form>
      <c-modal
        :visible.sync="env.modalOpened"
        container-class="w-[25rem]"
        @closed="handleModalClose"
      >
        <div class="text-center">
          <font-awesome-icon
            :icon="env.hasError ? 'circle-xmark' : 'circle-check'"
            size="4x"
            :class="['mb-6', env.hasError ? 'text-red-400' : 'text-green-400']"
          />
          <p class="mb-6">
            {{
              env.hasError
                ? $t('contact_us.submit_error')
                : $t('contact_us.submit_success')
            }}
          </p>
          <c-button class="w-full" @click="env.modalOpened = false">
            {{ $t('common.confirm') }}
          </c-button>
        </div>
      </c-modal>
    </div>
  </div>
</template>

<script>
import CForm from '~/components/ui/Form'
import CFormItem from '~/components/ui/FormItem'
import CInput from '~/components/ui/Input'
import CSelect from '~/components/ui/Select'
import CTextArea from '~/components/ui/TextArea'
import CButton from '~/components/ui/Button'
import countriesEn from '@/data/countries_en.json'
import countriesZhTW from '@/data/countries_zh_TW.json'
import BreadCrumbs from '~/components/ui/BreadCrumbs'
import { getOptions } from '~/api/inquiryFormOptions'
import { submitInquiryForm } from '~/api/inquiryForm'
import CModal from '~/components/ui/Modal'
import { getProductCategories } from '~/api/products'
import HoneyPot from '~/components/ui/HoneyPot'
export default {
  name: 'ContactUs',
  components: {
    HoneyPot,
    CModal,
    BreadCrumbs,
    CButton,
    CTextArea,
    CSelect,
    CInput,
    CFormItem,
    CForm
  },
  async asyncData({ $axios }) {
    const fetchProductCategories = async () => {
      const { data } = await getProductCategories($axios, {
        pagination: {
          limit: -1
        },
        sort: ['id:desc'],
        populate: {
          name: '*',
          product_types: {
            populate: {
              name: '*',
              products: {
                populate: {
                  name: '*'
                }
              }
            }
          }
        }
      })
      return data
    }

    const fetchOptions = async () => {
      const { data } = await getOptions($axios, {
        pagination: {
          limit: -1
        },
        populate: '*'
      })
      return data
    }

    const [optionsData, rawCategories] = await Promise.all([
      fetchOptions(),
      fetchProductCategories()
    ])

    return {
      rawCategories,
      optionsData
    }
  },
  data() {
    return {
      env: {
        submitLoading: false,
        modalOpened: false,
        hasError: false
      },
      countries: {
        en: countriesEn,
        tw: countriesZhTW
      },
      rawCategories: [],
      optionsData: [],
      form: {
        inquiry_type: '',
        product_type: '',
        product: '',
        country: '',
        city: '',
        company_name: '',
        full_name: '',
        email: '',
        phone_no: '',
        channel_to_know_us: '',
        channel_to_know_us_others: '',
        inquiry_details: ''
      }
    }
  },
  computed: {
    productTypeOptions() {
      return this.rawCategories.map((category) => {
        return {
          label: this.$_get(
            category,
            `attributes.name.${this.$i18n.localeProperties.dataKey}`
          ),
          options: this.$_get(
            category,
            `attributes.product_types.data`,
            []
          ).map((productType) => {
            return {
              label: this.$_get(
                productType,
                `attributes.name.${this.$i18n.localeProperties.dataKey}`
              ),
              value: this.$_get(productType, `attributes.key`)
            }
          })
        }
      })
    },
    selectedProductType() {
      for (const productCategory of this.rawCategories) {
        for (const productType of this.$_get(
          productCategory,
          'attributes.product_types.data',
          []
        )) {
          if (
            this.$_get(productType, `attributes.key`) === this.form.product_type
          ) {
            return productType
          }
        }
      }
      return []
    },
    productOptions() {
      return this.$_get(
        this.selectedProductType,
        'attributes.products.data',
        []
      ).map((product) => {
        return {
          label: this.$_get(
            product,
            `attributes.name.${this.$i18n.localeProperties.dataKey}`
          ),
          value: this.$_get(
            product,
            `attributes.name.${this.$i18n.localeProperties.dataKey}`
          )
        }
      })
    },
    crumbs() {
      return [
        {
          icon: 'house',
          label: this.$t('page.home'),
          path: this.localePath('index')
        },
        {
          icon: '',
          label: this.$t('page.contact_us')
        }
      ]
    },
    inquiryOptions() {
      return this.getFormattedOptions('inquiry-type')
    },
    channelToKnowUsOptions() {
      return this.getFormattedOptions('channel-to-know-us')
    },
    channelToKnowUsIsOthers() {
      return (
        this.channelToKnowUsOptions?.find(
          ({ value }) => this.form.channel_to_know_us === value
        )?.key === 'others'
      )
    },
    rules() {
      return {
        inquiry_type: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.inquiry_type')
            })
          }
        ],
        product_type: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.product_type')
            })
          }
        ],
        product: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.product')
            })
          }
        ],
        country: [
          // {
          //   required: true,
          //   message: this.$t('validation.required', {
          //     field: this.$t('contact_us.country')
          //   })
          // }
        ],
        city: [
          // {
          //   required: true,
          //   message: this.$t('validation.required', {
          //     field: this.$t('contact_us.city')
          //   })
          // }
        ],
        company_name: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.company_name')
            })
          }
        ],
        full_name: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.full_name')
            })
          }
        ],
        email: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.email')
            })
          },
          {
            type: 'email',
            message: this.$t('validation.email'),
            trigger: ['blur']
          }
        ],
        phone_no: [
          // {
          //   required: true,
          //   message: this.$t('validation.required', {
          //     field: this.$t('contact_us.phone_no')
          //   })
          // }
        ],
        channel_to_know_us: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.channel_to_know_us')
            })
          }
        ],
        channel_to_know_us_others: [
          {
            required: this.channelToKnowUsIsOthers,
            message: this.$t('validation.required', {
              field: this.$t('common.this_field')
            })
          }
        ],
        inquiry_details: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.inquiry_details')
            })
          }
        ]
      }
    },
    countryOptions() {
      const countries = this.countries[this.$i18n.locale] || {}
      return Object.entries(countries).map(([value, label]) => ({
        label,
        value: label
      }))
    }
  },
  mounted() {
    this.selectProductTypeAndProductFromQuery()
  },
  methods: {
    selectProductTypeAndProductFromQuery() {
      if (!this.$route.query?.product) return
      for (const productCategory of this.rawCategories) {
        for (const productType of this.$_get(
          productCategory,
          'attributes.product_types.data',
          []
        )) {
          for (const product of this.$_get(
            productType,
            'attributes.products.data'
          )) {
            if (
              this.$_get(product, `attributes.key`) ===
              this.$route.query.product
            ) {
              this.form.product_type = this.$_get(productType, `attributes.key`)
              this.form.product = this.$_get(
                product,
                `attributes.name.${this.$i18n.localeProperties.dataKey}`
              )
              return
            }
          }
        }
      }
    },
    handleModalClose() {
      if (!this.env.hasError) {
        this.$refs.form.resetFields()
      }
      this.env.hasError = false
    },
    handleProductTypeChange(val) {
      this.form.product_type = val
      this.form.product = ''
    },
    handlePhoneInput(val) {
      this.form.phone_no = val.replace(/\D/g, '')
    },
    getFormattedOptions(key) {
      return (
        this.optionsData
          ?.find((item) => item?.attributes?.key === key)
          ?.attributes?.options.map((option) => ({
            label: option[this.$i18n.localeProperties.dataKey],
            value: option[this.$i18n.localeProperties.dataKey],
            key: option.key
          })) || []
      )
    },
    async handleSubmit() {
      try {
        await this.$refs.form.validate()
      } catch (error) {
        return
      }
      if (!this.$refs.honeypot.validate()) return

      try {
        this.env.submitLoading = true

        const payload = this.$_cloneDeep(this.form)
        payload.product_type = this.$_get(
          this.selectedProductType,
          `attributes.name.${this.$i18n.localeProperties.dataKey}`
        )

        await submitInquiryForm(this.$axios, { data: payload })
      } catch (err) {
        this.env.hasError = true
      } finally {
        this.env.modalOpened = true
        this.env.submitLoading = false
      }
    }
  }
}
</script>

<style scoped></style>
