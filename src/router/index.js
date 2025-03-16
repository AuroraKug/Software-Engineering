import {createRouter, createWebHistory} from 'vue-router'
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'
import ResetVue from '@/views/Password-Change.vue'
import {useTokenStore} from "@/stores/token.js"

const routes = [
	{path: '/login', component: LoginVue},
	{path: '/', component: LayoutVue},
	{path: '/reset', component: ResetVue}
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
		if (to.path === '/login') {
			next()
		} else {
			next('/login')
		}
	}
})

export default router