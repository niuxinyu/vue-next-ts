<template>
  <LayoutSider
      hasSider
      :triggrr="null"
      v-model:collapsed="getCollapsed"
  >
    <Logo
        :maxLogo="MaxLogo"
        :minLogo="MinLogo"
        :collapsed="getCollapsed"
    ></Logo>
    <MenuNode :MenuList="siders" @menu-click="handleTurnPage"/>
  </LayoutSider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import Logo from './components/Logo/Logo';
import MenuNode from './components/Menu/MenuNode.vue';
import MaxLogo from '@/assets/images/max-logo-slow.gif';
import MinLogo from '@/assets/images/min-logo-slow.gif';
import { useRouter } from "vue-router";
import { useGo, useMenuSetting } from "@/hooks/app";

export default defineComponent({
  name: 'LayoutHeader',
  components: {
    LayoutSider: Layout.Sider,
    Logo,
    MenuNode
  },
  setup () {

    const router = useRouter();

    const go = useGo();

    const { getCollapsed } = useMenuSetting();

    function handleTurnPage (params: { key: string }) {
      go(params.key);
    }

    console.log(router.options);

    return {
      getCollapsed,
      MaxLogo,
      MinLogo,
      siders: router.options.routes,
      handleTurnPage
    };
  }
});
</script>

<style scoped lang="less">
.logo {
  :deep .logo-img {
    width: 100%;
    height: 70px;
    object-fit: contain;
  }
}
</style>
