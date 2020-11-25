<template>
  <Card>
    <slot></slot>
  </Card>
</template>

<script lang="ts">
import { Card } from 'ant-design-vue';

export default {
  name: 'n-card',
  components: {
    Card
  }
};
</script>

<style scoped>

</style>
