<template>
  <input
    ref="input"
    :type="type"
    :value="value"
    class="c-input inline-block w-full rounded-md border border-slate-300 placeholder-slate-400 transition-colors focus:border-primary-400 focus:ring-0 disabled:cursor-not-allowed disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
    :placeholder="placeholder"
    :disabled="inputDisabled"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import emitterMixin from '~/mixins/emitterMixin'
export default {
  name: 'CInput',
  mixins: [emitterMixin],
  inject: ['CForm'],
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputDisabled() {
      return this.disabled || (this.CForm || {}).disabled
    }
  },
  methods: {
    handleInput(e) {
      const val = e.target.value
      this.$emit('input', val)
      this.dispatch('CFormItem', 'form.change')
      this.$nextTick(this.setNativeInputValue)
    },
    handleBlur(e) {
      this.$emit('blur', e)
      this.dispatch('CFormItem', 'form.blur')
    },
    setNativeInputValue() {
      const input = this.$refs.input
      if (!input) return
      if (input.value === this.value) return
      input.value = this.value
    }
  }
}
</script>

<style scoped lang="scss"></style>
