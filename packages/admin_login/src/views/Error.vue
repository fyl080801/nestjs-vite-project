<script lang="ts" setup>
import { ElCard, ElButton } from 'element-plus';
const onBack = () => {
  window.history.back();
};
</script>

<template>
  <ElCard class="error-panel">
    <p>用户名或密码错误</p>
    <p>
      <ElButton @click="onBack">返回</ElButton>
    </p>
  </ElCard>
</template>

<style lang="css" scoped>
.error-panel {
  text-align: center;
}
</style>
