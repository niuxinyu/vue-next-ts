<template>
  <ADropdown v-model:visible="visible">
    <template #overlay>
      <AMenu>
        <AMenuItem>
          <UserOutlined/>
          <span>{{ t('userCenter') }}</span>
        </AMenuItem>
        <AMenuItem>
          <SettingOutlined/>
          <span>{{ t('setting') }}</span>
        </AMenuItem>
        <AMenuDivider/>
        <AMenuItem>
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
import { defineComponent } from 'vue';
import { UserOutlined, SettingOutlined, PoweroffOutlined } from '@ant-design/icons-vue';
import { usei18n } from '@/libs/tools';

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
