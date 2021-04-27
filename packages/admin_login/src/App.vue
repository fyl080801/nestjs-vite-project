<script lang="ts" setup>
import { ref, reactive } from 'vue';
import Button from 'ant-design-vue/lib/button';
import Form from 'ant-design-vue/lib/form';
import Input from 'ant-design-vue/lib/input';
import Card from 'ant-design-vue/lib/card';
import notification from 'ant-design-vue/lib/notification';
import 'ant-design-vue/lib/button/style/index.css';
import 'ant-design-vue/lib/form/style/index.css';
import 'ant-design-vue/lib/input/style/index.css';
import 'ant-design-vue/lib/card/style/index.css';
import 'ant-design-vue/lib/notification/style/index.css';

const CardGrid = Card.Grid;
const FormItem = Form.Item;
const PasswordInput = Input.Password;

const loading = ref(false);
const formData = reactive({ username: '', password: '' });

const onFinish = async () => {
  await fetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json' },
  });
};

const onFinishFailed = () => {
  notification.open({
    message: '登陆失败',
    description: '请您完善表单！',
  });
};
</script>

<template>
  <Card
    :style="{
      background: 'rgba(255, 255, 255, .3)',
      backdropFilter: 'blur(10px)',
    }"
  >
    <CardGrid :style="{ width: '100%' }">
      <!-- <Logo /> -->
      <Form
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 18 }"
        :model="formData"
        @finish="onFinish"
        @finish-failed="onFinishFailed"
        :style="{ width: '480px', padding: '40px 0 0 20px' }"
      >
        <FormItem
          label="账号"
          name="username"
          :rules="[{ required: true, message: '请输入!' }]"
        >
          <Input v-model:value="formData.username" />
        </FormItem>

        <FormItem
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入!' }]"
        >
          <PasswordInput v-model:value="formData.password" />
        </FormItem>

        <FormItem :wrapper-col="{ offset: 5, span: 18 }">
          <Button
            :loading="loading"
            type="primary"
            htmlType="submit"
            :style="{ width: '100%' }"
          >
            登陆
          </Button>
        </FormItem>
      </Form>
    </CardGrid>
  </Card>
</template>
