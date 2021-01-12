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
import { defineComponent, reactive, toRaw, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { useForm } from '@ant-design-vue/use';
import { login } from '@/api/login';
import { message } from 'ant-design-vue';
import { setAuthorization, turnTo } from "@/libs/utils";
import config from "@/config";
import { loadRouter } from "@/libs/routerUtil";

export default defineComponent({
  name: "LoginForm",
  components: {
    UserOutlined,
    LockOutlined
  },
  setup () {

    const router = useRouter();
    const store = useStore();

    const formDataRef = reactive({
      userName: '',
      password: ''
    });

    const formRulesRef = reactive({
      userName: [{ required: true, message: '用户名必填' }],
      password: [{ required: true, message: '密码必填' }]
    });

    const { resetFields, validate, validateInfos } = useForm(formDataRef, formRulesRef);

    const getRoutersList = computed(() => store.getters['app/getRoutersList']);

    const getMenuList = () => {
      return store.dispatch('app/getMenuList');
    };

    const handleLogin = async (params: any) => {
      setAuthorization({ token: params.result.token, expireAt: new Date(params.result.expireAt) });
      if (config.asyncRoutes) {
        const res = await getMenuList();
        if (res) {
          loadRouter(getRoutersList.value);
        }
      }
      turnTo(router, 'home');
    };

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      validate().then(async () => {
        const { data } = await login(toRaw(formDataRef));
        if (data.status === 200) {
          await handleLogin(data);
        }
        else {
          message.error('登录失败');
        }
      }).catch((err: any) => {
        console.log(err);
      });
    };

    return {
      wrapperCol: {
        span: 24
      },
      formDataRef,
      formRulesRef,
      resetFields,
      validate,
      validateInfos,
      handleSubmit
    };
  }
});
</script>

<style scoped>
</style>
