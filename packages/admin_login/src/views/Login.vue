<script lang="ts" setup>
import { ElForm, ElCard, ElFormItem, ElInput, ElButton } from 'element-plus';
import { ref, reactive } from 'vue';

const formRef = ref();
const formData = reactive({ username: '', password: '' });
const onLogin = async () => {
  try {
    await formRef.value.validate();
    formRef.value.$el.submit();
  } catch {
    //
  }
};
</script>

<template>
  <ElCard>
    <ElForm
      :ref="(el) => (formRef = el)"
      :model="formData"
      action="/admin/login"
      method="POST"
    >
      <ElFormItem
        label="用户名"
        prop="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
      >
        <ElInput name="username" v-model="formData.username" />
      </ElFormItem>
      <ElFormItem
        label="密码"
        prop="password"
        :rules="[{ required: true, message: '请输入密码' }]"
      >
        <ElInput name="password" type="password" v-model="formData.password" />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="onLogin">登录</ElButton>
      </ElFormItem>
    </ElForm>
  </ElCard>
</template>
