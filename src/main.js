import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import { sync } from 'vuex-router-sync'
sync(store, router)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
ElementUI.Dialog.props.closeOnClickModal.default = false
Vue.use(ElementUI)

import 'highlight.js/styles/monokai-sublime.css'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)


import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
