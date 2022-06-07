import get from 'lodash.get'
import set from 'lodash.set'

export default ({ app }, inject) => {
  inject('_get', get)
  inject('_set', set)
}

export { get, set }
