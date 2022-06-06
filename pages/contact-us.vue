<template>
  <div class="contact-us main-container-padded">
    <bread-crumbs :items="crumbs" class="mb-8" />
    <div class="mx-auto max-w-screen-lg">
      <h4
        class="linear-primary mb-6 inline-block bg-clip-text text-transparent"
      >
        聯絡我們
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
            :label="$t('contact_us.product_category')"
            prop="product_category"
          >
            <c-select
              :value="form.product_category"
              :option-groups="productCategoryOptions"
              @input="handleProductCategoryChange"
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
export default {
  name: 'ContactUs',
  components: {
    CModal,
    BreadCrumbs,
    CButton,
    CTextArea,
    CSelect,
    CInput,
    CFormItem,
    CForm
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
      optionsData: [],
      form: {
        inquiry_type: '',
        product_category: '',
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
      },
      industrialWiringOptions: [
        {
          label: 'Instrumentation harness',
          value: 'Instrumentation harness'
        },
        {
          label: 'INDUSTRIAL DRAG CABLE',
          value: 'INDUSTRIAL DRAG CABLE'
        },
        {
          label: 'D-SUB DM POWER 8W8PIN',
          value: 'D-SUB DM POWER 8W8PIN'
        },
        {
          label: 'Industrial network cable',
          value: 'Industrial network cable'
        },
        {
          label: 'Waterproof wiring harness',
          value: 'Waterproof wiring harness'
        },
        {
          label: 'Signal transmission system cable of industrial printer',
          value: 'Signal transmission system cable of industrial printer'
        },
        {
          label: 'Automatic control system cable',
          value: 'Automatic control system cable'
        },
        { label: 'RS232 SERIES cable', value: 'RS232 SERIES cable' }
      ],
      rfCableOptions: [
        { label: 'SMA cable 50Ω', value: 'SMA cable 50Ω' },
        { label: 'TNC cable 50Ω', value: 'TNC cable 50Ω' },
        { label: 'BNC cable 75Ω', value: 'BNC cable 75Ω' },
        { label: 'I-PEX cable', value: 'I-PEX cable' },
        { label: 'SMB cable 50Ω', value: 'SMB cable 50Ω' },
        { label: 'N Type cable 50Ω', value: 'N Type cable 50Ω' },
        { label: 'MMCX cable 50Ω', value: 'MMCX cable 50Ω' },
        { label: 'RF SERIES cable', value: 'RF SERIES cable' }
      ],
      renewableEnergyHarnessOptions: [
        { label: 'PV CABLE', value: 'PV CABLE' },
        { label: 'PV Y CABLE', value: 'PV Y CABLE' },
        {
          label: 'Cable for energy storage systems',
          value: 'Cable for energy storage systems'
        }
      ],
      connectorOptions: [
        {
          label: 'M Series Waterproof Connector',
          value: 'M Series Waterproof Connector'
        },
        {
          label: 'Circular Series Waterproof Connector',
          value: 'Circular Series Waterproof Connector'
        },
        {
          label: 'I/O Series Waterproof Connector',
          value: 'I/O Series Waterproof Connector'
        },
        {
          label: 'RJ45 SERIES WATERPROOF CONNECTOR',
          value: 'RJ45 SERIES WATERPROOF CONNECTOR'
        },
        {
          label: 'USB SERIES WATERPROOF CONNECTOR',
          value: 'USB SERIES WATERPROOF CONNECTOR'
        },
        {
          label: 'CIRCULAR SERIES WATERPROOF CONNECTOR',
          value: 'CIRCULAR SERIES WATERPROOF CONNECTOR'
        },
        {
          label: 'D-SUB SERIES WATERPROOF CONNECTOR',
          value: 'D-SUB SERIES WATERPROOF CONNECTOR'
        },
        {
          label: 'UENSOR9  SERIES WATERPROOF CONNECTOR',
          value: 'UENSOR9  SERIES WATERPROOF CONNECTOR'
        },
        {
          label: 'TYPE-C  SERIES WATERPROOF CONNECTOR',
          value: 'TYPE-C  SERIES WATERPROOF CONNECTOR'
        }
      ],
      tactSwitchOptions: [
        { label: 'A1', value: 'A1' },
        { label: 'A2', value: 'A2' },
        { label: 'A5', value: 'A5' }
      ],
      slideSwitchOptions: [
        { label: 'B1', value: 'B1' },
        { label: 'B2', value: 'B2' }
      ],
      detectionSwitchOptions: [
        { label: 'C1', value: 'C1' },
        { label: 'C2', value: 'C2' }
      ],
      productCategoryOptions: [
        {
          label: '線材',
          options: [
            {
              label: '工業線束',
              value: 'industrialWiringOptions'
            },
            {
              label: 'RF CABLE',
              value: 'rfCableOptions'
            },
            {
              label: '再生能源線束',
              value: 'renewableEnergyHarnessOptions'
            }
          ]
        },
        {
          label: '連接器',
          options: [{ label: '防水連接器', value: 'connectorOptions' }]
        },
        {
          label: '開關',
          options: [
            { label: '輕觸開關', value: 'tactSwitchOptions' },
            { label: '滑動開關', value: 'slideSwitchOptions' },
            { label: '偵測開關', value: 'detectionSwitchOptions' }
          ]
        }
      ]
    }
  },
  async fetch() {
    const { data } = await getOptions(this.$axios, {
      'pagination[limit]': -1,
      populate: '*'
    })
    this.optionsData = data
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
        product_category: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.product_category')
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
    productOptions() {
      return this?.[this.form.product_category] || []
    },
    countryOptions() {
      const countries = this.countries[this.$i18n.locale] || {}
      return Object.entries(countries).map(([value, label]) => ({
        label,
        value
      }))
    }
  },
  methods: {
    handleModalClose() {
      this.$refs.form.resetFields()
      this.env.hasError = false
    },
    handleProductCategoryChange(val) {
      this.form.product_category = val
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

      try {
        this.env.submitLoading = true
        await submitInquiryForm(this.$axios, { data: this.form })
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
