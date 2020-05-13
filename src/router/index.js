import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landing,
    props: true
  },
  {
    path: '/home',
    name: 'un',
    component: () => import('../views/something.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
