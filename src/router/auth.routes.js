// src/router/auth.routes.js
import LoginVue from '@/views/Login.vue'
import ResetVue from '@/views/Password-Change.vue'

export default [
  { path: '/login', component: LoginVue },
  { path: '/reset', component: ResetVue }
]
