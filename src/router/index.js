import {createRouter, createWebHistory} from 'vue-router'
import {useTokenStore} from "@/stores/token.js"

import LayoutVue from '@/views/Layout.vue'
import LoginVue from '@/views/Login.vue'
import ResetVue from '@/views/Password-Change.vue'
import UserProfileVue from '@/views/UserProfile.vue'
import ShopVue from '@/views/Shop.vue'


const routes = [
	{path: '/login', component: LoginVue},
	{path: '/reset', component: ResetVue},

	{path: '/', component: LayoutVue},
	{path: '/shop', component: ShopVue},

	{path: '/user-profile', component: UserProfileVue},
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
		if (to.path === '/login' || to.path === '/') {
			next()
		} else {
			// next('/login')
			next()
		}
	}
})

export default router