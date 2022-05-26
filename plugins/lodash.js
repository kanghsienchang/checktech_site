import get from 'lodash.get'

export default ({ app }, inject) => {
  inject('_get', get)
}
