<template>
  <input
    :type="type"
    :value="value"
    class="c-input inline-block w-full rounded-md border border-slate-300 placeholder-slate-400 transition-colors focus:border-primary-400 focus:ring-0"
    :placeholder="placeholder"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'CInput',
  mixins: [emitterMixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleInput(e) {
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

<style scoped lang="scss"></style>
