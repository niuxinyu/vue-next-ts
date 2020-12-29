<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="platform">
        <h1>欢迎登录</h1>
      </div>
      <div class="login-form">
        <h2 style="margin: 20px 26px;color: #1132F7;">Sing Up</h2>
        <div style="text-align: center;">
          <img :src="computer" alt="computer">
        </div>
        <div class="login-form__wrapper">
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from "@/components/LoginForm/LoginForm.vue";
import computer from '@/assets/login/computer.png';

export default defineComponent({
  name: "Login",
  components: {
    LoginForm
  },
  setup () {
    return {
      computer
    };
  }
});
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background-color: #EAEEFA;
  position: relative;

  &-wrapper {
    width: 800px;
    height: 500px;
    background: url("../../assets/login/login-form.png") no-repeat center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
  }
}

.platform, .login-form {
  padding: 36px;
  flex: 50%;
}

.platform {
  h1 {
    color: #fff;
    user-select: none;
  }
}

.login-form {
  position: relative;
  &__wrapper {
    width: 60%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
