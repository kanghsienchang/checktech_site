<template>
  <select
    ref="select"
    :class="[
      'c-select inline-block w-full rounded-md border border-slate-300 transition-colors focus:border-primary-400 focus:ring-0 disabled:cursor-not-allowed disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-100',
      { 'text-slate-400': !value }
    ]"
    :value="value"
    :disabled="selectDisabled"
    @input="handleChange"
    @blur="handleBlur"
  >
    <option value hidden disabled :selected="!value">
      {{ placeholder || $t('common.please_select') }}
    </option>
    <template v-if="options">
      <option
        v-for="option in options"
        :key="option.value"
        :selected="option.value === value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </template>
    <template v-if="optionGroups">
      <optgroup
        v-for="group in optionGroups"
        :key="group.label"
        :label="group.label"
      >
        <option
          v-for="option in group.options"
          :key="option.value"
          :selected="option.value === value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </optgroup>
    </template>
  </select>
</template>

<script>
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'CSelect',
  mixins: [emitterMixin],
  inject: ['CForm'],
  props: {
    options: {
      type: Array,
      default: () => []
    },
    optionGroups: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: () => {}
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectDisabled() {
      return this.disabled || (this.CForm || {}).disabled
    }
  },
  methods: {
    handleChange(e) {
      const val = e.target.value
      this.$emit('input', val)
      this.dispatch('CFormItem', 'form.change')
    },
    handleBlur(e) {
      this.$emit('blur', e)
      this.dispatch('CFormItem', 'form.blur')
    }
  }
}
</script>

<style scoped></style>
