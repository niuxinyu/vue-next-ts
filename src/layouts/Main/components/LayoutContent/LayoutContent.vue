<template>
  <Layout>
    <LayoutHeader class="header">
      <div class="header-wrapper">
          <span class="collapsed" @click="handleCollapsed">
            <template v-if="getCollapsed">
              <MenuUnfoldOutlined/>
            </template>
            <template v-else>
              <MenuFoldOutlined/>
            </template>
          </span>
        <UserCenter></UserCenter>
      </div>
    </LayoutHeader>
    <ALayoutContent class="layout-body">
      <Layout>
        <TagsNav :tags-nav-list="getTagsNavList"/>
      </Layout>
      <ALayoutContent :style="`margin-top: ${config.multiPage ? -16 : 0}px`">
        <RouterView #default="{Component}">
          <KeepAlive>
            <Component :is="Component"/>
          </KeepAlive>
        </RouterView>
      </ALayoutContent>
    </ALayoutContent>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, unref } from 'vue';
import {
  Layout
} from 'ant-design-vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import UserCenter from './components/UserCenter/index.vue';
import TagsNav from './components/TagsNav/TagsNav.vue';
import config from '@/config';
import { useAppStoreOutSide } from "@/store/module/app";
import { TagNavItem } from "@/types";
import { useRoute, useRouter } from "vue-router";
import { useMenuSetting } from "@/hooks/app";

export default defineComponent({
  name: 'LayoutContent',
  components: {
    Layout,
    LayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserCenter,
    TagsNav
  },
  setup () {

    const appStore = useAppStoreOutSide();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      appStore.setTagNavList();
      const { name, meta, params, query } = route;
      appStore.addTag({
        route: { name, meta, params, query }
      });
      if (!appStore.getTagsNavList.find((item: TagNavItem) => item.name === name)) {
        router.push({ name: config.homeName });
      }
    });

    const { setCollapsed, getCollapsed } = useMenuSetting();

    function handleCollapsed () {
      setCollapsed(!unref(getCollapsed));
    }

    const getTagsNavList = computed(() => appStore.getTagsNavList);

    return {
      handleCollapsed,
      config,
      getTagsNavList,
      getCollapsed
    };
  }
});
</script>

<style scoped lang="less">
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
