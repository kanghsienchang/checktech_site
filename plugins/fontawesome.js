import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
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
  faGlobe,
  faCircleArrowRight,
  faBars,
  faAnglesDown
} from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'

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
  faGlobe,
  faCircleArrowRight,
  faBars,
  faCircleXmark,
  faAnglesDown
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
