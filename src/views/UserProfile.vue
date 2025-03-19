<template>
    <el-card class="user-profile">
        <h2>个人信息</h2>
        <el-descriptions :column="1" border>
            <el-descriptions-item label="用户名">{{ userProfile.username }}</el-descriptions-item>
            <el-descriptions-item label="邮箱">{{ userProfile.email }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ formatDate(userProfile.createTime) }}</el-descriptions-item>
        </el-descriptions>
    </el-card>
</template>

<script setup>
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useUserInfoService } from '@/api/userProfile';
import { onMounted } from 'vue';

const userProfile = ref({
  username: "",
  email: "",
  createTime: "",
});
const loading = ref(true);



const handleFetchUserInfo = async () => {
    try {
        userProfile.value = await useUserInfoService();
        console.log(userProfile.value)

    } catch (error) {
        console.error('用户信息加载失败:', error.message);
    } finally {
        loading.value = false;
    }
}

// 时间格式化函数
const formatDate = (isoString) => dayjs(isoString).format("YYYY-MM-DD HH:mm:ss");

// 自动获取info
onMounted(handleFetchUserInfo);

</script>

<style scoped>
.user-profile {
    max-width: 500px;
    margin: auto;
}
</style>
