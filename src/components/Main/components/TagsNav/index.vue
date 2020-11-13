<template>
  <div class="tags-nav">
    <Tabs
        v-model:activeKey="activeKey"
        type="card"
    >
      <TabPane
          v-for="item in tagsNavList"
          :key="item.name"
      >
        <template v-slot:tab>
          <div class="tab" @click="() => handleTabsClick(item)">
            {{ getTagNavTitle(item) }}
          </div>
          <CloseOutlined v-if="shouldShowCloseable(item.name)" class="icon-close" @click="() => handleTabsClose(item)"/>
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
import beforeClose from '@/router/before-close';
import { mapMutations } from 'vuex';

interface TagsNavProps {
  tagsNavList: TagNavItem[];
}

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
      activeKey: ''
    };
  },
  methods: {
    handleTabsClick (params: TagNavItem) {
      this.$router.push({
        name: params.name
      });
    },
    handleTabsClose (params: TagNavItem) {
      if (params.meta && params.meta.beforeCloseName && params.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[params.meta.beforeCloseName]).then(res => {
          res && this.handleCanCloseTabs(params);
        });
      }
      else {
        this.handleCanCloseTabs(params);
      }
    },
    handleCanCloseTabs (params: TagNavItem): void {
      const res = this.tagsNavList.filter((item: any) => item.name === params.name);
      this.closeTag(res[0]);
    },
    getTagNavTitle (item: TagNavItem) {
      return item.meta.title;
    },
    ...mapMutations([
      'closeTag'
    ])
  },
  updated () {
    console.log(this.activeKey);
  },
  computed: {
    shouldShowCloseable () {
      return (name: string) => name !== config.homeName;
    }
  },
  watch: {
    '$route': {
      handler (newVal: TagNavItem) {
        this.activeKey = newVal.name;
      },
      immediate: true
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
