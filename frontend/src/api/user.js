import request from '@/utils/request.js'

export const userRegisterService = (accountData) => {
	const params = new URLSearchParams()
	params.append('email', accountData.email)
	// params.append('code', accountData.code) // 先不传code
	params.append('userType', accountData.userType)
	params.append('username', accountData.username)
	params.append('password', accountData.password)
	return request.post('/auth/register', params)
}

export const userLoginService = (accountData) => {
	const params = new URLSearchParams()
	params.append('username', accountData.username)
	params.append('password', accountData.password)
	return request.post('/auth/login', params)
}