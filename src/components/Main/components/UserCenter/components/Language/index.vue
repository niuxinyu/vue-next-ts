<template>
  <Dropdown v-model:visible="visible" placement="bottomRight">
    <template #overlay>
      <Menu
          selectable
          @click="handleToggleLanguage"
      >
        <MenuItem v-for="item in langList" :key="item.key">
          {{ item.title.toLowerCase() + ' ' + item.name }}
        </MenuItem>
      </Menu>
    </template>
    <span>
      {{ t('language') }}
    </span>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Dropdown, Menu } from 'ant-design-vue';
import { usei18n } from '@/libs/tools';

export default defineComponent({
  name: 'Language',
  setup () {
    const langList = [
      { key: 'zh-CN', title: 'zh', name: '简体中文', alias: '简体' },
      { key: 'zh-TW', title: 'hk', name: '繁體中文', alias: '繁體' },
      { key: 'en-US', title: 'en', name: 'English', alias: 'English' }
    ];
    const msg = {
      messages: {
        'zh-CN': {
          language: '语言'
        },
        'zh-TW': {
          language: '語言'
        },
        'en-US': {
          language: 'Language'
        }
      }
    };
    return {
      langList,
      ...usei18n(msg)
    };
  },
  components: {
    Dropdown,
    Menu,
    MenuItem: Menu.Item
  },
  data () {
    return {
      visible: false
    };
  },
  methods: {
    handleToggleLanguage (params: any) {
      this.$i18n.locale = params.key;
      this.visible = false;
    }
  }
});
</script>

<style scoped>

</style>
