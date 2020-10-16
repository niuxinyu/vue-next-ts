<template>
  <Layout class="layout">
    <Sider :trigger="null" v-model:collapsed="collapsed" collapsible>
      <Logo
          :maxLogo="MaxLogo"
          :minLogo="MinLogo"
          :collapsed="collapsed"
      ></Logo>
      <MenuNode :MenuList="siders"/>
    </Sider>
    <Layout>
      <Header class="header">
        <div class="header-wrapper">
          <span class="collapsed" @click="handleCollapsed">
            <MenuUnfoldOutlined/>
          </span>
          <UserCenter></UserCenter>
        </div>
      </Header>
      <Content>
        <RouterView/>
      </Content>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { Layout } from 'ant-design-vue';
import MenuNode from '@/components/Main/components/MenuNode.vue';
import { MenuUnfoldOutlined } from '@ant-design/icons-vue';
import Logo from './components/Logo';
import MaxLogo from '@/assets/images/max-logo-slow.gif';
import MinLogo from '@/assets/images/min-logo-slow.gif';
import { defineComponent } from 'vue';
import UserCenter from './components/UserCenter/index.vue';

export default defineComponent({
  name: 'Main',
  components: {
    Layout,
    Sider: Layout.Sider,
    Header: Layout.Header,
    Content: Layout.Content,
    MenuNode,
    MenuUnfoldOutlined,
    Logo,
    UserCenter
  },
  setup () {
    return {
      MaxLogo,
      MinLogo
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
    }
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

</style>
