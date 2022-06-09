import get from 'lodash.get'
import set from 'lodash.set'
import cloneDeep from 'lodash.clonedeep'

export default ({ app }, inject) => {
  inject('_get', get)
  inject('_set', set)
  inject('_cloneDeep', cloneDeep)
}

export { get, set }
