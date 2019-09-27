import Vue from 'vue'
//const Vue = window.Vue

import App from './App.vue'
import router from './router/index'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
sync(store, router)

import ElementUI from 'element-ui'
//const ElementUI = window.ELEMENT
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'highlight.js/styles/monokai-sublime.css'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
