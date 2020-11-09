<template>
  <Card>
    <h1>这是other页面</h1>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Card } from 'ant-design-vue';

export default defineComponent({
  name: 'index',
  components: {
    Card
  }
});
</script>

<style scoped>

</style>
