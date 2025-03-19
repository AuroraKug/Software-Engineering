// src/router/auth.routes.js
import LoginVue from '@/views/Login.vue'
import ChangePasswordVue from '@/views/Password-Change.vue'

export default [
  { path: '/login', component: LoginVue },
  { path: '/change-password', component: ChangePasswordVue }
]
