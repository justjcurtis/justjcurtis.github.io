import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './icons'
import ScrollAnimation from './directives/scrollAnimation'
import LanderTrigger from './directives/landerTrigger'
import VueTypedJs from 'vue-typed-js'
import store from './store'


Vue.use(VueTypedJs)
Vue.use(router)
Vue.directive('scrollAnimation', ScrollAnimation)
Vue.directive('landertrigger', LanderTrigger)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
