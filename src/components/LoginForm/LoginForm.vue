<template>
<!--必须添加一个model 否则登录第一次报错  不知道为什么-->
  <AForm :wrapper-col="wrapperCol" @submit="handleSubmit" :model="{}">
    <AFormItem v-bind="validateInfos.userName">
      <AInput placeholder="用户名 admin"
              v-model:value="formDataRef.userName"
      >
        <template #prefix>
          <UserOutlined style="color:rgba(0,0,0,.5)"/>
        </template>
      </AInput>
    </AFormItem>
    <AFormItem v-bind="validateInfos.password">
      <AInput placeholder="密码 admin" type="password" v-model:value="formDataRef.password">
        <template #prefix>
          <LockOutlined style="color:rgba(0,0,0,.5)"/>
        </template>
      </AInput>
    </AFormItem>
    <AButton style="width: 100%" type="primary" htmlType="submit">登录</AButton>
  </AForm>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import { login } from '@/api/login';
import { message } from 'ant-design-vue';
import { localSave } from "@/libs/tools";
import { setAuthorization } from "@/libs/utils";

export default defineComponent({
  name: "LoginForm",
  components: {
    UserOutlined,
    LockOutlined
  },
  setup () {
    const formDataRef = reactive({
      userName: '',
      password: ''
    });

    const formRulesRef = reactive({
      userName: [{ required: true, message: '用户名必填' }],
      password: [{ required: true, message: '密码必填' }]
    });

    const { resetFields, validate, validateInfos } = useForm(formDataRef, formRulesRef);

    return {
      wrapperCol: {
        span: 24
      },
      formDataRef,
      formRulesRef,
      resetFields,
      validate,
      validateInfos
    };
  },
  methods: {
    handleSubmit (e: Event) {
      e.preventDefault();
      this.validate().then(async () => {
        const { data, status } = await login(toRaw(this.formDataRef));
        if (status === 200) {
          this.handleLogin(data);
        }
        else {
          message.error('登录失败');
        }
      }).catch((err: any) => {
        console.log(err);
      });
    },
    handleLogin (params: any) {
      setAuthorization({ token: params.data.result.token, expireAt: new Date(params.data.result.expireAt) });
      this.$router.push({
        name: 'home'
      });
    }
  }
});
</script>

<style scoped>
</style>
