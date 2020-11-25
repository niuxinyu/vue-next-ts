<template>
  <Dropdown v-model:visible="visible">
    <template #overlay>
      <Menu>
        <MenuItem>
          <UserOutlined/>
          <span>{{ t('userCenter') }}</span>
        </MenuItem>
        <MenuItem>
          <SettingOutlined/>
          <span>{{ t('setting') }}</span>
        </MenuItem>
        <MenuDivider/>
        <MenuItem>
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
import { Dropdown, Menu } from 'ant-design-vue';
import { UserOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { usei18n } from '@/libs/tools';

export default defineComponent({
  name: 'User',
  components: {
    Dropdown,
    Menu,
    MenuItem: Menu.Item,
    MenuDivider: Menu.Divider,
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
    return {
      ...usei18n(msg)
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
