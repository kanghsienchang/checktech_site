<template>
  <textarea
    ref="textarea"
    class="c-textarea inline-block w-full rounded-md border border-slate-300 align-bottom placeholder-slate-400 transition-colors focus:border-primary-400 focus:ring-0"
    :placeholder="placeholder"
    :style="textAreaStyle"
    :value="value"
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
    }
  },
  data() {
    return {
      textAreaStyle: {}
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
