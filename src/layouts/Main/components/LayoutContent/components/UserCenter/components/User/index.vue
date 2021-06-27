<template>
  <Dropdown v-model:visible="visible">
    <template #overlay>
      <Menu @click="handleLogout">
        <MenuItem key="userCenter">
          <UserOutlined/>
          <span>{{ t('userCenter') }}</span>
        </MenuItem>
        <MenuItem key="setting">
          <SettingOutlined/>
          <span>{{ t('setting') }}</span>
        </MenuItem>
        <MenuDivider/>
        <MenuItem key="logout">
          <PoweroffOutlined/>
          <span>{{ t('logout') }}</span>
        </MenuItem>
      </Menu>
    </template>
    <span>
      {{ t('user') }}
    </span>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Dropdown,
  Menu,
} from 'ant-design-vue';
import { UserOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { MenuInfo } from "ant-design-vue/es/menu/src/interface";
import { useGo } from "@/hooks/app";
import { useI18n } from "vue-i18n";
import { useAppStoreOutSide } from "@/store/module/app";
import { PageEnum } from "@/enums/pageEnum";

export default defineComponent({
  name: 'User',
  components: {
    UserOutlined,
    SettingOutlined,
    PoweroffOutlined,
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    MenuDivider: Menu.Divider
  },
  setup () {
    const msg = {
      messages: {
        'zh-CN': {
          user: '用户中心',
          userCenter: '个人中心',
          setting: '设置',
          logout: '退出登录'
        },
        'zh-TW': {
          user: '用戶中心',
          userCenter: '個人中心',
          setting: '設置',
          logout: '退出登錄'
        },
        'en-US': {
          user: 'UserCenter',
          userCenter: 'UserCenter',
          setting: 'setting',
          logout: 'logout'
        }
      }
    };

    const go = useGo();

    const appStore = useAppStoreOutSide();

    async function handleLogout (params: MenuInfo) {
      if (params.key === PageEnum.BASE_LOGOUT) {
        await appStore.logout();
        go(PageEnum.BASE_LOGIN);
      }
    }

    return {
      ...useI18n(msg),
      handleLogout
    };
  },
  data () {
    return {
      visible: false
    };
  }
});
</script>

<style scoped>

</style>
