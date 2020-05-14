import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Home.vue'
import Projects from '../views/Projects.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Landing
  },
  {
    path: '/Projects',
    name: 'Projects',
    component: Projects
  }
]

const router = new VueRouter({
  routes
})

export default router
