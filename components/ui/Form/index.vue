<template>
  <form class="c-form">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'CForm',
  componentName: 'CForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    validateOnRuleChange: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fields: []
    }
  },
  watch: {
    rules() {
      // remove then add event listeners on form-item after form rules change
      this.fields.forEach((field) => {
        field.removeValidateEvents()
        field.addValidateEvents()
      })
      if (this.validateOnRuleChange) {
        this.validate(() => {})
      }
    }
  },
  created() {
    this.$on('form.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })
    this.$on('form.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  },
  methods: {
    validateField(props, cb) {
      props = [].concat(props)
      const fields = this.fields.filter((field) => props.includes(field.prop))
      if (!fields.length) {
        // eslint-disable-next-line no-console
        console.warn('Please pass correct props!')
        return
      }
      fields.forEach((field) => {
        field.validate('', cb)
      })
    },
    resetFields() {
      if (!this.model) {
        // eslint-disable-next-line no-console
        console.warn('[Form]model is required for resetFields to work.')
        return
      }
      this.fields.forEach((field) => {
        field.resetField()
      })
    },
    clearValidate(props = []) {
      const fields = props.length
        ? typeof props === 'string'
          ? this.fields.filter((field) => props === field.prop)
          : this.fields.filter((field) => props.includes(field.prop))
        : this.fields
      fields.forEach((field) => {
        field.clearValidate()
      })
    },
    validate(callback) {
      if (!this.model) {
        // eslint-disable-next-line no-console
        console.warn('[Form]model is required for validate to work!')
        return
      }
      let promise
      // if no callback, return promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function (valid, invalidFields) {
            valid ? resolve(valid) : reject(invalidFields)
          }
        })
      }
      let valid = true
      let count = 0
      if (this.fields.length === 0 && callback) {
        // eslint-disable-next-line node/no-callback-literal
        callback(true)
      }
      let invalidFields = {}
      this.fields.forEach((field) => {
        field.validate('', (message, field) => {
          if (message) {
            valid = false
          }
          invalidFields = { ...invalidFields, field }
          if (
            typeof callback === 'function' &&
            ++count === this.fields.length
          ) {
            callback(valid, invalidFields)
          }
        })
      })
      if (promise) {
        return promise
      }
    }
  }
}
</script>

<style scoped></style>
