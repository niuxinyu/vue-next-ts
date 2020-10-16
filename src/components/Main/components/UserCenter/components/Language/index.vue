<template>
  <Dropdown v-model:visible="visible" placement="bottomRight">
    <template #overlay>
      <Menu
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
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Language',
  setup () {
    const langList = [
      { key: 'zh-CN', title: 'zh', name: '简体中文', alias: '简体' },
      { key: 'HK', title: 'hk', name: '繁體中文', alias: '繁體' },
      { key: 'en-US', title: 'en', name: 'English', alias: 'English' }
    ];
    // 针对于vue3.0的i18n的component使用方式已经发生改变
    const i18n = useI18n({
      messages: {
        'zh-CN': {
          language: '切换语言'
        },
        'en-US': {
          language: 'Switch language'
        }
      }
    });
    return {
      langList,
      ...i18n
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
    }
  }
});
</script>

<style scoped>

</style>
