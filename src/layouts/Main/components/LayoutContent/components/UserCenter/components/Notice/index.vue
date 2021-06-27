<template>
  <Dropdown :trigger="['click']" v-model:visible="visible">
    <template #overlay>
      <div class="notice-dropdown">
        <Tabs :tabBarStyle="{textAlign: 'center'}" :style="{width: '297px'}">
          <TabPane v-for="item in tabsList" :key="item.key" :tab="item.tab">
            <List>
              <ListItem>
                <ListItemMeta :title="item.tab" description="这是描述">
                </ListItemMeta>
              </ListItem>
            </List>
          </TabPane>
        </Tabs>
      </div>
    </template>
    <div>
      <BellOutlined @click="e => e.preventDefault()"></BellOutlined>
    </div>
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  Dropdown,
  Tabs,
  List,
} from 'ant-design-vue';
import { BellOutlined } from '@ant-design/icons-vue';
import type { Ref } from 'vue';

export default defineComponent({
  name: 'Notice',
  components: {
    BellOutlined,
    Dropdown,
    Tabs,
    TabPane: Tabs.TabPane,
    List,
    ListItem: List.Item,
    ListItemMeta: List.Item.Meta
  },
  setup () {
    const tabsList = [
      {
        key: 1,
        tab: '通知'
      },
      {
        key: 2,
        tab: '待办'
      },
      {
        key: 3,
        tab: '关于'
      }
    ];
    const visible: Ref<boolean> = ref(false);
    return {
      tabsList,
      visible
    };
  },
});
</script>

<style scoped lang="less">
.notice-dropdown {
  background: #fff;
  box-shadow: 0 0 4px @box-shadow-base;
  border-radius: 4px;
  padding: 8px;
  height: 350px;
}
</style>
