<template>
  <div class="tags-nav">
    <Tabs
        v-model:activeKey="activeKey"
        type="card"
        @change="handleTabsChange"
    >
      <TabPane
          v-for="item in tagsNavList"
          :key="item.name"
      >
        <template v-slot:tab>
          <div class="tab">
            {{ getTagNavTitle(item) }}
          </div>
          <CloseOutlined v-if="shouldShowCloseable(item.name)" class="icon-close"/>
        </template>
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tabs } from 'ant-design-vue';
import { TagNavItem } from "@/types";
import { CloseOutlined } from '@/components/Icon';
import config from '@/config';

export default defineComponent({
  name: 'tags-nav',
  components: {
    Tabs,
    TabPane: Tabs.TabPane,
    CloseOutlined
  },
  props: {
    tagsNavList: {
      type: Array,
      default: () => []
    },
    currentActiveTag: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      activeKey: this.$route.name
    };
  },
  methods: {
    handleTabsChange (activeKey: string) {
      this.$router.push({
        name: activeKey
      });
    },
    getTagNavTitle (item: TagNavItem) {
      return item.meta.title;
    }
  },
  computed: {
    shouldShowCloseable () {
      return (name: string) => name !== config.homeName;
    }
  },
  watch: {
    '$route' (newVal: TagNavItem) {
      this.activeKey = newVal.name;
    }
  }
});
</script>

<style scoped lang="less">
.no-select {
  user-select: none;
}

.size {
  width: 100%;
  height: 100%;
}

.tags-nav {
  position: relative;
  border-top: 1px solid #F0F0F0;
  border-bottom: 1px solid #F0F0F0;
  .no-select;
  .size;
}

.tab {
  display: inline-block;
  margin: 0 -16px;
  padding: 0 16px;
  font-size: 14px;
  .no-select;
}

.icon-close {
  font-size: 12px;
  margin-left: 6px;
  margin-right: -4px !important;
}

</style>
