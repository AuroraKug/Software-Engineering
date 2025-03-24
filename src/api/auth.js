import axios from 'axios'
import {ElMessage} from 'element-plus'
import { useTokenStore } from '@/stores/token'
import { errorCodeMessages } from '@/constants/errorMessage'


/* 
 * 这里定义了一系列与用户认证相关的服务供外部调用
 */

export const useRegisterService = async (userData) => {
	try {
		const response = await axios.post('/api/auth/register', userData, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		ElMessage.success('注册成功')
		return response.data
	} catch (error) {
		if (error.response?.data?.code) {
			if (errorCodeMessages[error.response.data.code]) {
				ElMessage.error(`注册失败: ${errorCodeMessages[error.response.data.code]}`)
			} else {
				ElMessage.error('注册失败')
			}
		} else {
			ElMessage.error('注册失败，请稍后重试')
		}
		throw error
	}
}

export const useLoginService = async (credentials) => {
	try {
		const response = await axios.post('/api/auth/login', credentials, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		ElMessage.success('登录成功！')
		return response.data
	} catch (error) {
		if (error.response?.data?.code) {
			if (errorCodeMessages[error.response.data.code]) {
				ElMessage.error(`登录失败: ${errorCodeMessages[error.response.data.code]}`)
			} else {
				ElMessage.error('登录失败')
			}
		} else {
			ElMessage.error('登录失败')
		}
		throw error
	}
}

export const useLogoutService = async () => {
	try{
		const tokenStore=useTokenStore()
		const userToken=tokenStore.token
		const data = { token: userToken }; 
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			  'Authorization': `Bearer ${userToken}` 
			},
			body: JSON.stringify(data)
		  });
		if(response.ok){
			tokenStore.removeToken()
		}
		ElMessage.success('登出成功')
	}catch(error){
		if (error.response?.data?.code) {
			if (errorCodeMessages[error.response.data.code]) {
				ElMessage.error(`登出失败: ${errorCodeMessages[error.response.data.code]}`)
			} else {
				ElMessage.error('登出失败')
			}
		} else {
			ElMessage.error('登出失败')
		}
		throw error
	}
}


export const useGetCaptchaService = async () => {
	try {
		const response = await axios.get('/api/auth/captcha/register-captcha', {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		return response.data
	} catch (error) {
		throw error
	}
}