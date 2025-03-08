import axios from 'axios'
import {ElMessage} from 'element-plus'

const baseURL = 'http://localhost:8080/api'

const instance = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
})

instance.interceptors.request.use(
		config => {
			return config
		},
		error => {
			ElMessage.error('请求异常')
			return Promise.reject(error)
		}
)

instance.interceptors.response.use(
		response => {
			const result = response.data
			if (result.code !== 200) {
				ElMessage.error(result.msg || '服务异常')
				return Promise.reject(result)
			}
			return result
		},
		error => {
			ElMessage.error('服务异常')
			return Promise.reject(error)
		}
)

export default instance