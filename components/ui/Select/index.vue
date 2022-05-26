<template>
  <select
    :class="[
      'c-select inline-block w-full rounded-md border border-slate-300 transition-colors focus:border-primary-400 focus:ring-0',
      { 'text-slate-400': !value }
    ]"
    :value="value"
    @input="handleChange"
    @blur="handleBlur"
  >
    <option value hidden disabled selected>
      {{ placeholder || $t('common.please_select') }}
    </option>
    <template v-if="options">
      <option
        v-for="option in options"
        :key="option.value"
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
