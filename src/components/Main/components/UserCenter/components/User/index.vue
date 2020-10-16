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
      用户中心
    </span>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Dropdown, Menu } from 'ant-design-vue';
import { UserOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons-vue';

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
  }
});
</script>

<style scoped>

</style>
