import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faChevronDown,
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(
  faChevronDown,
  faCaretRight
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
