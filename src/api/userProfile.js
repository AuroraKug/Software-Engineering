import axios from 'axios'
import {ElMessage} from 'element-plus'
import { useTokenStore } from '@/stores/token'
import { errorCodeMessages } from '@/constants/errorMessage'

/* 
 * 这里定义了一系列与已经登录用户认证相关的服务供外部调用
 */

export const useChangePasswordService = async (passwordData) => {
    try {
        const tokenStore=useTokenStore()
        const userToken=tokenStore.token

        const response = await fetch('/api/user/profile/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
            oldPassword: passwordData.oldPassword,
            newPassword: passwordData.newPassword,
            confirmPassword: passwordData.confirmPassword
          })
        });
    
        const data = await response.json();
        if (response.ok) {
            ElMessage.success('密码修改成功')
        } else {
            ElMessage.error('密码修改失败')
        }
        return data
      } catch (error) {
        if (error.response?.data?.code) {
			if (errorCodeMessages[error.response.data.code]) {
				ElMessage.error(`密码修改失败: ${errorCodeMessages[error.response.data.code]}`)
			} else {
				ElMessage.error('密码修改失败')
			}
		} else {
			ElMessage.error('密码修改失败，请稍后重试')
		}
        
        throw error
      }
}

export const useUserInfoService = async () => {
    try {
        const tokenStore=useTokenStore()
        const userToken=tokenStore.token

        const response = await fetch('/api/user/profile/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
        });
    
        const data = await response.json();
        return data
        
      } catch (error) {
        if (error.response?.data?.code) {
			if (errorCodeMessages[error.response.data.code]) {
				ElMessage.error(`个人信息请求失败: ${errorCodeMessages[error.response.data.code]}`)
			} else {
				ElMessage.error('个人信息请求失败')
			}
		} else {
			ElMessage.error('个人信息请求失败')
		}
        throw error
      }
}