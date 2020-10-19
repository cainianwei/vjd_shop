import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.css'
import '@/assets/css/style.css'
import '@/plugins/element.js'

Vue.config.productionTip = false

import Axios from 'axios'

// Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Axios.interceptors.request.use((config)=>{
  config.headers.token = window.localStorage.getItem('token')
  // 在最后必须 return config
  return config

})

Vue.prototype.axios = Axios //挂载插件，通过挂载来进行this指向

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
