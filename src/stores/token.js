import {defineStore} from "pinia"
import {ref} from 'vue'

export const useTokenStore = defineStore('token', () => {
			const token = ref('')
			const expiresAt = ref('')

			const setToken = (newToken, expirationTime) => {
				token.value = newToken
				expiresAt.value = expirationTime
			}

			const removeToken = () => {
				token.value = ''
				expiresAt.value = ''
			}

			const isLoggedIn = () => {
				if (!token.value || !expiresAt.value) {
					return false
				}
				return new Date() < new Date(expiresAt.value)
			}

			return {
				token, expiresAt, setToken, removeToken, isLoggedIn
			}
		},
		{
			persist: true
		}
)