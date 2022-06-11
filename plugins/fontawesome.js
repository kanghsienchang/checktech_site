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
  faAngleDown,
  faAnglesDown,
  faAngleRight,
  faHouse,
  faCircleNotch,
  faCircleCheck,
  faCircleXmark,
  faCircle,
  faXmark,
  faPlus
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
  faGlobe,
  faCircleArrowRight,
  faBars,
  faCircleXmark,
  faAnglesDown,
  faAngleRight,
  faHouse,
  faAngleDown,
  faCircleNotch,
  faCircleCheck,
  faCircle,
  faXmark,
  faPlus
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
