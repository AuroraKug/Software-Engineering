import axios from 'axios'
import {ElMessage} from 'element-plus'

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
		if (error.response?.data?.message) {
			ElMessage.error(`注册失败: ${error.response.data.message}`)
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
		if (error.response?.data?.message) {
			ElMessage.error(`登录失败: ${error.response.data.message}`)
		} else {
			ElMessage.error('登录失败')
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