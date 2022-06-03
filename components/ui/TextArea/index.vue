<template>
  <textarea
    ref="textarea"
    class="c-textarea inline-block w-full rounded-md border border-slate-300 align-bottom placeholder-slate-400 transition-colors focus:border-primary-400 focus:ring-0 disabled:cursor-not-allowed disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
    :placeholder="placeholder"
    :style="textAreaStyle"
    :value="value"
    :disabled="textAreaDisabled"
    @input="handleInput"
    @blur="handleBlur"
  />
</template>

<script>
import calcTextareaHeight from '~/components/ui/TextArea/calcTextareaHeight'
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'CTextArea',
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
    autosize: {
      type: [Boolean, Object],
      default: () => ({ minRows: 5, maxRows: null })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      textAreaStyle: {}
    }
  },
  computed: {
    textAreaDisabled() {
      return this.disabled || (this.CForm || {}).disabled
    }
  },
  mounted() {
    this.resize()
  },
  methods: {
    resize() {
      if (!this.autosize) return
      const minRows = this.autosize.minRows
      const maxRows = this.autosize.maxRows
      this.textAreaStyle = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      )
    },
    handleInput(e) {
      const val = e.target.value
      this.$emit('input', val)
      this.dispatch('CFormItem', 'form.change')
      this.resize()
    },
    handleBlur(e) {
      this.$emit('blur', e)
      this.dispatch('CFormItem', 'form.blur')
    }
  }
}
</script>

<style scoped></style>
