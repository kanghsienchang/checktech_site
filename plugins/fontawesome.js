import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faChevronDown,
  faCaretRight,
  faCheck, faBusinessTime, faTruck, faClipboardCheck, faHandHoldingHeart, faPhone, faEnvelope, faLocationDot, faGlobe
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(
  faChevronDown,
  faCaretRight,
  faCheck,
  faBusinessTime,
  faTruck,
  faClipboardCheck,
  faHandHoldingHeart,
  faPhone,
  faEnvelope,
  faLocationDot,
  faGlobe
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
