import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import Loarder from '../views/Loarder.vue'
import LoarderHome from '@/views/LoarderHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/loarder',
      name: 'loarder',
      component: Loarder,
    },
    {
      path: '/loarderhome',
      name: 'loarderhome',
      component: LoarderHome,
    },
  ],
})

export default router
