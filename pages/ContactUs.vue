<template>
  <div class="contact-us">
    <div class="mx-auto max-w-screen-lg">
      <h4
        class="linear-primary mb-6 inline-block bg-clip-text text-transparent"
      >
        聯絡我們
      </h4>
      <c-form :model="form" :rules="rules">
        <div class="grid md:grid-cols-2 md:gap-x-8">
          <c-form-item
            class="md:col-span-2"
            :label="$t('contact_us.inquiry_type')"
            prop="inquiry_type"
          >
            <c-select v-model="form.inquiry_type" :options="inquiryTypes" />
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
            <c-input v-model="form.email" />
          </c-form-item>
          <c-form-item :label="$t('contact_us.phone_no')" prop="phone_no">
            <c-input v-model="form.phone_no" />
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
            v-if="form.channel_to_know_us === 'others'"
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
            <c-button class="w-full md:w-auto">送出洽詢</c-button>
          </c-form-item>
        </div>
      </c-form>
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
export default {
  name: 'ContactUs',
  components: { CButton, CTextArea, CSelect, CInput, CFormItem, CForm },
  data() {
    return {
      countries: {
        en: countriesEn,
        zh_TW: countriesZhTW
      },
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
      inquiryTypes: [
        { label: '產品訂購', value: '產品訂購' },
        { label: '客製化產品諮詢', value: '客製化產品諮詢' },
        { label: '其他', value: '其他' }
      ],
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
      ],
      channelToKnowUsOptions: [
        { label: '網路搜尋', value: '網路搜尋' },
        { label: '朋友/同事介紹', value: '朋友/同事介紹' },
        { label: '社群媒體', value: '社群媒體' },
        { label: '新聞報導', value: '新聞報導' },
        { label: '展覽', value: '展覽' },
        { label: '其他', value: 'others' }
      ]
    }
  },
  computed: {
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
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.country')
            })
          }
        ],
        city: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.city')
            })
          }
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
          }
        ],
        phone_no: [
          {
            required: true,
            message: this.$t('validation.required', {
              field: this.$t('contact_us.phone_no')
            })
          }
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
            required: this.form.channel_to_know_us === 'others',
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
    handleProductCategoryChange(val) {
      this.form.product_category = val
      this.form.product = ''
    }
  }
}
</script>

<style scoped></style>
