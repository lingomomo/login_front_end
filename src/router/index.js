import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import( '../views/Login.vue')
  },
  {
    path: '/showindex',
    name: 'ShowIndex',
    component: () => import( '../views/ShowIndex.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import( '../views/Detail.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
