<template>
  <ADropdown v-model:visible="visible" placement="bottomRight">
    <template #overlay>
      <AMenu
          selectable
          @click="handleToggleLanguage"
      >
        <AMenuItem v-for="item in langList" :key="item.key">
          {{ item.title.toLowerCase() + ' ' + item.name }}
        </AMenuItem>
      </AMenu>
    </template>
    <span>
      {{ t('language') }}
    </span>
  </ADropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

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
    const visible = ref(false);
    // todo 暂时使用这种方式解决
    const globalI18n = useI18n();
    const i18n = useI18n({
      ...msg
    });

    const handleToggleLanguage = (params: any) => {
      globalI18n.locale.value = params.key;
      visible.value = false;
    };

    return {
      langList,
      visible,
      t: i18n.t,
      handleToggleLanguage
    };
  }
});
</script>

<style scoped>

</style>
