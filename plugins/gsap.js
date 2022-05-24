import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.config({
  nullTargetWarn: false
})

export default ({ app }, inject) => {
  gsap.registerPlugin(ScrollTrigger)
  inject('gsap', gsap)
  inject('ScrollTrigger', ScrollTrigger)
  inject('showScrollMarker', process.env.NUXT_DEBUG_GSAP === 'true')
}
