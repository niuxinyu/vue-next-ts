<template>
  <router-view></router-view>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import NProgress from "@/components/NProgress/NProgress";

export default defineComponent({
  name: 'App'
});
</script>
<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
