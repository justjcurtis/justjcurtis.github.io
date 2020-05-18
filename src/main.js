import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTypedJs from 'vue-typed-js'
import {VueMasonryPlugin} from 'vue-masonry';

import './icons'
import ScrollAnimation from './directives/scrollAnimation'
import LanderTrigger from './directives/landerTrigger'
import store from './store'


Vue.use(VueTypedJs)
Vue.use(router)
Vue.use(VueMasonryPlugin)
Vue.directive('scrollAnimation', ScrollAnimation)
Vue.directive('landertrigger', LanderTrigger)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
