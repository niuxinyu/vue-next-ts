<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NProgress from "@/components/NProgress/NProgress";
export default defineComponent({
  name: 'App',
  created () {
    const nprogress = new NProgress();
    nprogress.set(0);
  }
});
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
