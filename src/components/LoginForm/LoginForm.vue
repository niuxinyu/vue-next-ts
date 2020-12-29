<template>
  <AForm>
    <AFormItem v-bind="formItemLayout">
      <AInput placeholder="用户名"
      >
        <template #prefix><UserOutlined style="color:rgba(0,0,0,.5)"/></template>
      </AInput>
    </AFormItem>
    <AFormItem v-bind="formItemLayout">
      <AInput placeholder="密码">
        <template #prefix><LockOutlined style="color:rgba(0,0,0,.5)"/></template>
      </AInput>
    </AFormItem>
    <AButton style="width: 100%" type="primary">登录</AButton>
  </AForm>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: "LoginForm",
  components: {
    UserOutlined,
    LockOutlined
  },
  setup () {
    const formItemLayout = {
      wrapperCol: {
        sm: { span: 24 },
      },
    };
    return {
      formItemLayout
    };
  }
});
</script>

<style scoped>
</style>
