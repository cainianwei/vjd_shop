import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.css'
import '@/assets/css/style.css'
import '@/plugins/element.js'
Vue.config.productionTip = false

import Axios from 'axios'
Vue.prototype.axios = Axios //挂载插件，通过挂载来进行this指向

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
