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
import { defineComponent, ref } from 'vue';
import {
  Dropdown,
  Menu,
} from 'ant-design-vue';
import { useI18n, UseI18nOptions } from "vue-i18n";
import type { Ref } from 'vue';

export default defineComponent({
  name: 'Language',
  components: {
    Dropdown,
    Menu,
    MenuItem: Menu.Item
  },
  setup () {
    const langList = [
      { key: 'zh-CN', title: 'zh', name: '简体中文', alias: '简体' },
      { key: 'zh-TW', title: 'hk', name: '繁體中文', alias: '繁體' },
      { key: 'en-US', title: 'en', name: 'English', alias: 'English' }
    ];
    const msg = {
      useScope: 'global',
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
    } as UseI18nOptions;

    const visible: Ref<boolean> = ref(false);
    const { t, locale } = useI18n(msg);

    function handleToggleLanguage (params: any) {
      locale.value = params.key;
      visible.value = false;
    }

    return {
      t,
      langList,
      visible,
      handleToggleLanguage,
    };
  }
});
</script>

<style scoped>

</style>
