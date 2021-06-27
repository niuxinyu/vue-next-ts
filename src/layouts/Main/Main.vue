<template>
  <Layout class="layout">
    <LayoutSider/>
    <LayoutContent/>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Layout
} from 'ant-design-vue';
import LayoutSider from './components/LayoutSider/LayoutSider.vue';
import LayoutContent from './components/LayoutContent/LayoutContent.vue';

export default defineComponent({
  name: 'Main',
  components: {
    Layout,
    LayoutSider,
    LayoutContent
  }
});
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
}
</style>
