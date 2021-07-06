<template>
  <Form
      :wrapper-col="wrapperCol"
      @submit="handleSubmit"
      :model="formDataRef"
  >
    <FormItem v-bind="validateInfos.userName">
      <Input placeholder="用户名"
             v-model:value="formDataRef.userName"
      >
        <template #prefix>
          <UserOutlined style="color:rgba(0,0,0,.5)"/>
        </template>
      </Input>
    </FormItem>
    <FormItem v-bind="validateInfos.password">
      <Input placeholder="密码" v-model:value="formDataRef.password">
        <template #prefix>
          <LockOutlined style="color:rgba(0,0,0,.5)"/>
        </template>
      </Input>
    </FormItem>
    <Button style="width: 100%" type="primary" htmlType="submit" :loading="loginButtonLoading">登录</Button>
  </Form>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref } from 'vue';
import {
  Form,
  Input,
  Button
} from 'ant-design-vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import { login } from '@/api/login';
import { message } from 'ant-design-vue';
import { localSave } from "@/libs/tools";
import type { Ref } from 'vue';
import { PageEnum } from "@/enums/pageEnum";
import router from "@/router/router";

export default defineComponent({
  name: "LoginForm",
  components: {
    Form,
    FormItem: Form.Item,
    Button,
    Input,
    UserOutlined,
    LockOutlined
  },
  setup () {
    const formDataRef = reactive({
      userName: 'admin',
      password: 'admin'
    });
    const formRulesRef = reactive({
      userName: [{ required: true, message: '用户名必填' }],
      password: [{ required: true, message: '密码必填' }]
    });

    const { resetFields, validate, validateInfos } = useForm(formDataRef, formRulesRef);

    async function handleLogin (params: any) {
      return new Promise(resolve => {
        setTimeout(async () => {
          localSave('token', params.data.result.token.split(":")[1]);
          await router.replace(PageEnum.BASE_HOME);
          await
              resolve();
        }, 2000);
      });
    }

    const loginButtonLoading: Ref<boolean> = ref(false);

    function handleSubmit () {
      loginButtonLoading.value = true;
      validate().then(async () => {
        const res = await login(toRaw(formDataRef));
        if (res.status === 200) {
          await handleLogin(res.data);
        }
        else {
          message.error('登录失败');
        }
        loginButtonLoading.value = false;
      });
    }

    return {
      wrapperCol: {
        span: 24
      },
      formDataRef,
      formRulesRef,
      resetFields,
      validate,
      validateInfos,
      handleSubmit,
      loginButtonLoading
    };
  }
});
</script>

<style scoped>
</style>
