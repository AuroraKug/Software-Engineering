import axios from 'axios'
import {ElMessage} from 'element-plus'
import { useTokenStore } from '@/stores/token'
import { errorCodeMessages } from '@/constants/errorMessage'

export const useChangePasswordService = async () => {
    try {
        const tokenStore=useTokenStore()
        const userToken=tokenStore.token

        const response = await fetch('/api/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: JSON.stringify({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value
          })
        });
    
        const data = await response.json();
        if (response.ok) {
            ElMessage.success('密码修改成功')
        } else {
            ElMessage.success('密码修改失败')
        }
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
      }
}