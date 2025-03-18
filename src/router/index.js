import {createRouter, createWebHistory} from 'vue-router'
import LayoutVue from '@/views/Layout.vue'
import {useTokenStore} from "@/stores/token.js"

import authRoutes from './auth.routes'

const mainRoutes = [
	{ path: '/', component: LayoutVue }
]

const routes = [
	...authRoutes,
	...mainRoutes
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
		if (to.path === '/login' || to.path === '/reset') {
			next()
		} else {
			next('/login')
		}
	}
})

export default router