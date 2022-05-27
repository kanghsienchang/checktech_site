import Vue from 'vue'
import Router from 'vue-router'
import Home from '~/pages/Home'
import ContactUs from '~/pages/ContactUs'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
      return { top: 0 }
    },
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
          icon: 'house',
          title: '首頁'
        }
      },
      {
        path: '/contact-us',
        name: 'contact-us',
        component: ContactUs,
        meta: {
          title: '聯絡我們'
        }
      }
      // {
      // path: '/products',
      // name: 'products',
      // component: () =>
      // import('@/pages/Products.vue').then((m) => m.default || m),
      // meta: {
      // title: '產品'
      //  }
      // }
    ]
  })
}
