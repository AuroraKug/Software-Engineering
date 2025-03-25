<template>
  <div class="pagination-bar">
    <el-pagination background layout="prev, pager, next" :total="100"/>
  </div>
</template>

<style scoped>
.pagination-bar {
  width: 800px;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 40px;
  margin-bottom: 20px;
}

:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .el-pager li) {
  background-color: #f0f0f0;
}

:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .el-pager li) {
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>