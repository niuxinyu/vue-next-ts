<template>
  <Layout class="layout">
    <Sider :trigger="null" v-model:collapsed="collapsed" collapsible>
      <Logo
          :maxLogo="MaxLogo"
          :minLogo="MinLogo"
          :collapsed="collapsed"
      ></Logo>
      <MenuNode :MenuList="siders" @menu-click="handleTurnPage"/>
    </Sider>
    <Layout>
      <Header class="header">
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
      </Header>
      <Content class="layout-body">
        <Layout>
          <TagsNav :tags-nav-list="getTagsNavList"/>
        </Layout>
        <Content :style="`margin-top: ${config.multiPage ? -24 : 0}px`">
          <RouterView/>
        </Content>
      </Content>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { Layout } from 'ant-design-vue';
import MenuNode from '@/components/Main/components/MenuNode.vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import Logo from './components/Logo';
import MaxLogo from '@/assets/images/max-logo-slow.gif';
import MinLogo from '@/assets/images/min-logo-slow.gif';
import { defineComponent } from 'vue';
import UserCenter from './components/UserCenter/index.vue';
import TagsNav from './components/TagsNav/index.vue';
import { mapMutations, mapGetters } from 'vuex';
import { TagNavItem } from '@/types';
import config from '@/config';

export default defineComponent({
  name: 'Main',
  components: {
    Layout,
    Sider: Layout.Sider,
    Header: Layout.Header,
    Content: Layout.Content,
    MenuNode,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    Logo,
    UserCenter,
    TagsNav
  },
  setup () {
    return {
      MaxLogo,
      MinLogo,
      config
    };
  },
  data () {
    return {
      collapsed: false,
      siders: this.$router.options.routes,
    };
  },
  methods: {
    handleCollapsed () {
      this.collapsed = !this.collapsed;
    },
    handleTurnPage (params: { key: string }) {
      this.$router.push({
        name: params.key
      });
    },
    ...mapMutations([
      'addTag',
      'setTagNavList'
    ])
  },
  mounted () {
    this.setTagNavList();
    const { name, meta, params, query } = this.$route;
    this.addTag({
      route: { name, meta, params, query }
    });
    if (!this.getTagsNavList.find((item: TagNavItem) => item.name === this.$route.name)) {
      this.$router.push({ name: config.homeName });
    }
  },
  computed: {
    ...mapGetters([
      'getTagsNavList'
    ])
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
