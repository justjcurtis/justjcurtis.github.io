import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './icons'
import ScrollAnimation from './directives/scrollAnimation'
import LanderTrigger from './directives/landerTrigger'
import VueTypedJs from 'vue-typed-js'
import store from './store'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// const vuexStore = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })

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
