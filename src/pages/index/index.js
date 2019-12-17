import Vue from 'vue'
import App from './index.vue'
import '@/config/entry'

import './css/index.css'

new Vue({
  render: h => h(App)
}).$mount('#app')
