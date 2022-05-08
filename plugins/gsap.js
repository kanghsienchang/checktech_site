import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default ({ app }, inject) => {
  gsap.registerPlugin(ScrollTrigger)
  inject('gsap', gsap)
  inject('ScrollTrigger', ScrollTrigger)
}
