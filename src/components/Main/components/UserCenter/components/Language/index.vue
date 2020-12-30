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
import { defineComponent } from 'vue';
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
