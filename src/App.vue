<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN.js';

export default defineComponent({
  name: 'App',
  components: {
    ConfigProvider
  }
});
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
