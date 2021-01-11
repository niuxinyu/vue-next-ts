<template>
  <ADropdown v-model:visible="visible">
    <template #overlay>
      <AMenu @click="handleUserCenterMenu">
        <AMenuItem key="userCenter">
          <UserOutlined/>
          <span>{{ t('userCenter') }}</span>
        </AMenuItem>
        <AMenuItem key="setting">
          <SettingOutlined/>
          <span>{{ t('setting') }}</span>
        </AMenuItem>
        <AMenuDivider/>
        <AMenuItem key="logout">
          <PoweroffOutlined/>
          <span>{{ t('logout') }}</span>
        </AMenuItem>
      </AMenu>
    </template>
    <span>
      {{ t('user') }}
    </span>
  </ADropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { UserOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { turnTo, xsrfHeaderName } from "@/libs/utils";
import Cookies from "js-cookie";
import { localClear } from "@/libs/tools";

export default defineComponent({
  name: 'User',
  components: {
    UserOutlined,
    SettingOutlined,
    PoweroffOutlined
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

    const visible = ref(false);

    const { t } = useI18n({ ...msg });

    const router = useRouter();

    const handleLogout = () => {
      Cookies.remove(xsrfHeaderName);
      localClear();
      turnTo(router, '/login');
    };

    const handleUserCenterMenu = (params: { key: string }) => {
      switch (params.key) {
        case 'logout':
          handleLogout();
          break;
      }
    };

    return {
      t,
      visible,
      handleLogout,
      handleUserCenterMenu
    };
  }
});
</script>

<style scoped>

</style>
