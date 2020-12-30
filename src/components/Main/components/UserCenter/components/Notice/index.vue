<template>
  <ADropdown :trigger="['click']" v-model:visible="visible">
    <template #overlay>
      <div class="notice-dropdown">
        <ATabs :tabBarStyle="{textAlign: 'center'}" :style="{width: '297px'}">
          <ATabPane v-for="item in tabsList" :key="item.key" :tab="item.tab">
            <AList>
              <AListItem>
                <AListItemMeta :title="item.tab" description="这是描述">
                </AListItemMeta>
              </AListItem>
            </AList>
          </ATabPane>
        </ATabs>
      </div>
    </template>
    <div>
      <BellOutlined @click="e => e.preventDefault()"></BellOutlined>
    </div>
  </ADropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BellOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'Notice',
  components: {
    BellOutlined
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
    return {
      tabsList
    };
  },
  data () {
    return {
      show: false,
      visible: false
    };
  },
  methods: {
    handleShowNotice () {
      console.log(666);
    }
  }
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
