import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

import 'vue-js-modal/dist/styles.css'
import '@/assets/styles/vue-js-modal.scss'

Vue.use(VModal, { componentName: 'VModel', height: 'auto' })
