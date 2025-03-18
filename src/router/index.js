import {createRouter, createWebHistory} from 'vue-router'
import LayoutVue from '@/views/Layout.vue'
import {useTokenStore} from "@/stores/token.js"

import authRoutes from './auth.routes'
import userProfileRoutes from './user.profile.routes'

const mainRoutes = [
	{ path: '/', component: LayoutVue }
]

const routes = [
	...authRoutes,
	...mainRoutes,
	...userProfileRoutes
]

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
		if (to.path === '/login' || to.path === '/reset' || to.path==='/') {
			next()
		} else {
			next('/login')
		}
	}
})

export default router