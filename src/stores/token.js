import {defineStore} from "pinia"
import {ref} from 'vue'

export const useTokenStore = defineStore('token', () => {
			const token = ref('')

			const setToken = (newToken) => {
				token.value = newToken
			}

			const removeToken = () => {
				token.value = ''
			}

			const isLoggedIn = () => {
				return !!token.value
			}

			return {
				token, setToken, removeToken, isLoggedIn
			}
		},
		{
			persist: true
		}
)