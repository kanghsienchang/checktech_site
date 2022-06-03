<template>
  <div
    :class="[
      'c-form-item relative mb-[1.4rem] block',
      {
        'c-form-item--error': validateState === 'error'
      }
    ]"
  >
    <label
      v-if="label"
      :class="['mb-1.5 inline-block text-slate-600', labelClass]"
    >
      {{ label }}
    </label>
    <slot />
    <transition @before-enter="beforeEnter" @enter="onEnter">
      <div
        v-show="validateState === 'error'"
        class="c-form-item__error absolute top-full left-0 pt-1 text-xs leading-none text-red-400"
      >
        {{ validateMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import emitterMixin from '~/mixins/emitterMixin'

export default {
  name: 'CFormItem',
  mixins: [emitterMixin],
  componentName: 'CFormItem',
  provide() {
    return {
      formItem: this
    }
  },
  inject: ['CForm'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      validator: {},
      isNested: false,
      animateError: null
    }
  },
  computed: {
    labelClass() {
      return {
        'before:text-red-400 before:content-["*"]': this.isRequired
      }
    },
    form() {
      let parent = this.$parent
      let parentName = parent.$options.componentName
      while (parentName !== 'CForm') {
        if (parentName === 'CFormItem') {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.isNested = true
        }
        parent = parent.$parent
        parentName = parent.$options.componentName
      }
      return parent
    },
    fieldValue() {
      const model = this.CForm.model
      if (!model || !this.prop) {
        return
      }
      let path = this.prop
      if (path.includes(':')) {
        path = path.replace(/:/, '.')
      }
      return this.getPropByPath(model, path, true).v
    },
    isRequired() {
      const rules = this.getRules()
      let isRequired = false
      if (rules && rules.length) {
        rules.every((rule) => {
          if (rule.required) {
            isRequired = true
            return false
          }
          return true
        })
      }
      return isRequired
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('CForm', 'form.addField', [this])
      let initialValue = this.fieldValue
      if (Array.isArray(initialValue)) {
        initialValue = [].concat(initialValue)
      }
      Object.defineProperty(this, 'initialValue', {
        value: initialValue
      })
      this.addValidateEvents()
    }
  },
  beforeDestroy() {
    this.dispatch('CForm', 'form.removeField', [this])
  },
  methods: {
    onEnter(el, done) {
      this.$gsap.to(el, {
        duration: 0.15,
        y: 0,
        opacity: 1,
        onComplete: done
      })
    },
    beforeEnter(el) {
      this.$gsap.set(el, {
        y: 5,
        opacity: 0
      })
    },
    getPropByPath(obj, path, strict) {
      let tempObj = obj
      path = path.replace(/\[(\w+)\]/g, '.$1')
      path = path.replace(/^\./, '')

      const keyArr = path.split('.')
      let i = 0
      for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break
        const key = keyArr[i]
        if (key in tempObj) {
          tempObj = tempObj[key]
        } else {
          if (strict) {
            throw new Error('please transfer a valid prop path to form item!')
          }
          break
        }
      }
      return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null
      }
    },
    validate(trigger, callback = () => {}) {
      this.validateDisabled = false
      const rules = this.getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }
      this.validateState = 'validating'
      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach((rule) => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.prop] = this.fieldValue
      validator.validate(
        model,
        { firstFields: true },
        (errors, invalidFields) => {
          this.validateState = !errors ? 'success' : 'error'
          this.validateMessage = errors ? errors[0].message : ''
          callback(this.validateMessage, invalidFields)
          this.CForm &&
            this.CForm.$emit(
              'validate',
              this.prop,
              !errors,
              this.validateMessage || null
            )
        }
      )
    },
    clearValidate() {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = false
    },
    resetField() {
      this.validateState = ''
      this.validateMessage = ''
      const model = this.CForm.model
      const value = this.fieldValue
      let path = this.prop
      if (path.includes(':')) {
        path = path.replace(/:/, '.')
      }
      const prop = this.getPropByPath(model, path, true)
      this.validateDisabled = true
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue)
      } else {
        prop.o[prop.k] = this.initialValue
      }
      // reset validateDisabled after onFieldChange triggered
      this.$nextTick(() => {
        this.validateDisabled = false
      })
      // this.broadcast('ElTimeSelect', 'fieldReset', this.initialValue)
    },
    getRules() {
      let formRules = this.CForm.rules
      const selfRules = this.rules
      const requiredRule =
        this.required !== undefined ? { required: !!this.required } : []
      const prop = this.getPropByPath(formRules, this.prop || '')
      formRules = formRules ? prop.o[this.prop || ''] || prop.v : []
      return [].concat(selfRules || formRules || []).concat(requiredRule)
    },
    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules
        .filter((rule) => {
          if (!rule.trigger || trigger === '') return true
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger)
          } else {
            return rule.trigger === trigger
          }
        })
        .map((rule) => ({ ...rule }))
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
    },
    addValidateEvents() {
      const rules = this.getRules()
      if (rules.length || this.required !== undefined) {
        this.$on('form.blur', this.onFieldBlur)
        this.$on('form.change', this.onFieldChange)
      }
    },
    removeValidateEvents() {
      this.$off()
    }
  }
}
</script>

<style lang="scss">
.c-form-item {
  &--error {
    .c-input,
    .c-select,
    .c-textarea {
      @apply border-red-400;
    }
  }
}
</style>
