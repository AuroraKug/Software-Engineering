import {createRouter, createWebHistory} from 'vue-router'
import LayoutVue from '@/views/Layout.vue'
import LoginVue from '@/views/Login.vue'
import ResetVue from '@/views/Password-Change.vue'
import UserProfileVue from '@/views/UserProfile.vue'
import ShopVue from '@/views/Shop.vue'

import {useTokenStore} from "@/stores/token.js"

import authRoutes from './auth.routes'
import userProfileRoutes from './user.profile.routes'

const mainRoutes = [
	{path: '/', component: LayoutVue},
	{path: '/shop', component: ShopVue}
]

const routes = [
	...authRoutes,
	...mainRoutes,
	...userProfileRoutes
]

// const r_s = [
// 	{path: '/', component: ''},
// 	{path: '/login', component: LoginVue},
// 	{path: '/reset', component: ResetVue},
// 	{path: '/user-profile', component: UserProfileVue},
// 	{path: '/home', component: HomeVue}
// ]

const router = createRouter(
		{
			history: createWebHistory(),
			routes: routes
		}
)

router.beforeEach((to, from, next) => {
	const tokenStore = useTokenStore()
	if (tokenStore.isLoggedIn()) {
		next()
	} else {
		if (to.path === '/login' || to.path === '/') {
			next()
		} else {
			// next('/login')
			next()
		}
	}
})

export default router