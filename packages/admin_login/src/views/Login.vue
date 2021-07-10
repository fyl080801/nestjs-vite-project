<script lang="ts" setup>
import { ElForm, ElCard, ElFormItem, ElInput, ElButton } from 'element-plus';
import { useRoute } from 'vue-router';
import { ref, reactive } from 'vue';

const { query } = useRoute();
const loginUrl = `/admin/login?returnUrl=${query.returnUrl}`;
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
  <div class="wrapper">
    <ElCard class="login">
      <template #header>
        <span>User Login</span>
      </template>
      <ElForm
        :ref="(el) => (formRef = el)"
        :model="formData"
        :action="loginUrl"
        label-width="120px"
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
          <ElInput
            name="password"
            type="password"
            v-model="formData.password"
          />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="onLogin">登录</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.login {
  position: absolute;
  width: 400px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
