<template>
  <Dropdown v-model:visible="visible">
    <template #overlay>
      <Menu>
        <MenuItem>
          <UserOutlined/>
          <span>个人中心</span>
        </MenuItem>
        <MenuItem>
          <SettingOutlined/>
          <span>设置</span>
        </MenuItem>
        <MenuDivider/>
        <MenuItem>
          <PoweroffOutlined/>
          <span>退出登录</span>
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
          user: '用户中心'
        },
        'zh-TW': {
          user: '用戶中心'
        },
        'en-US': {
          user: 'UserCenter'
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
