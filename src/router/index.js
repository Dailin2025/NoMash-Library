import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FireLoginView from '../views/FireLoginView.vue'
import RoleBasedAuthView from '../views/RoleBasedAuthView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/firelogin',
    name: 'FireLogin',
    component: FireLoginView
  },
  {
    path: '/role-auth',
    name: 'RoleBasedAuth',
    component: RoleBasedAuthView
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router