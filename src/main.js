import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(element)
Vue.prototype.$http=axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
