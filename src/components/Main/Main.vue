<template>
  <ALayout class="layout">
    <ALayoutSider :trigger="null" v-model:collapsed="collapsed" collapsible>
      <Logo
          :maxLogo="MaxLogo"
          :minLogo="MinLogo"
          :collapsed="collapsed"
      ></Logo>
      <MenuNode :MenuList="getMenuList" @menu-click="handleTurnPage"/>
    </ALayoutSider>
    <ALayout>
      <ALayoutHeader class="header">
        <div class="header-wrapper">
          <span class="collapsed" @click="handleCollapsed">
            <template v-if="collapsed">
              <MenuUnfoldOutlined/>
            </template>
            <template v-else>
              <MenuFoldOutlined/>
            </template>
          </span>
          <UserCenter></UserCenter>
        </div>
      </ALayoutHeader>
      <ALayoutContent class="layout-body">
        <ALayout>
          <TagsNav :tags-nav-list="getTagsNavList"/>
        </ALayout>
        <ALayoutContent :style="`margin-top: ${config.multiPage ? -16 : 0}px`">
          <RouterView/>
        </ALayoutContent>
      </ALayoutContent>
    </ALayout>
  </ALayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import MenuNode from '@/components/Main/components/MenuNode.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import Logo from './components/Logo';
import UserCenter from './components/UserCenter/index.vue';
import TagsNav from './components/TagsNav/index.vue';
import MaxLogo from '@/assets/images/max-logo-slow.gif';
import MinLogo from '@/assets/images/min-logo-slow.gif';
import { TagNavItem } from '@/types';
import config from '@/config';
import { turnTo } from "@/libs/utils";

export default defineComponent({
  name: 'Main',
  components: {
    MenuNode,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    Logo,
    UserCenter,
    TagsNav
  },
  setup () {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const collapsed = ref(false);

    function handleCollapsed () {
      collapsed.value = !collapsed.value;
    }

    function handleTurnPage (params: { key: string }) {
      // 不知道为什么 push 无法正确显示组件
      // router.push({
      //   name: params.key
      // });
      turnTo(router, '/' + params.key);
    }

    function addTag (payload: any) {
      store.commit('app/addTag', payload);
    }

    function setTagNavList () {
      store.commit('app/setTagNavList');
    }

    const getTagsNavList = computed(() => store.getters['app/getTagsNavList']);
    const getMenuList = computed(() => store.getters['app/getMenuList']);

    onMounted(() => {
      setTagNavList();
      const { name, meta, params, query } = route;
      addTag({
        route: { name, meta, params, query }
      });
      if (!getTagsNavList.value.find((item: TagNavItem) => item.name === route.name)) {
        // router.push({ name: config.homeName });
        turnTo(router, '/' + config.homeName);
      }
    });

    return {
      MaxLogo,
      MinLogo,
      config,
      collapsed,
      handleCollapsed,
      handleTurnPage,
      addTag,
      setTagNavList,
      getTagsNavList,
      getMenuList
    };
  }
});
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
}

.logo {
  ::v-deep .logo-img {
    width: 100%;
    height: 70px;
    object-fit: contain;
  }
}

.header {
  background: #fff;
  padding: 0;
  box-shadow: 0 2px 8px @box-shadow-base;
}

.header-wrapper {
  position: relative;
  padding-left: 16px;

  .collapsed {
    font-size: 16px;
    cursor: pointer;
  }
}

.layout-body {
  padding: 24px 24px 0;
}
</style>
