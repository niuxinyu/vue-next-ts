<template>
  <div class="tags-nav">
    <Tabs
        class="tabs"
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
          <CloseOutlined v-if="shouldShowCloseable(item.name)" class="icon-close"
                         @click.stop="() => handleTabsClose(item)"/>
        </template>
      </TabPane>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { Tabs } from 'ant-design-vue';
import { TagNavItem } from "@/types";
import { CloseOutlined } from '@/components/Icon';
import config from '@/config';
import beforeClose from '@/router/before-close';
import { mapMutations, mapActions } from 'vuex';

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
  setup () {
    // ts 内的setup类型
    // https://github.com/ibwei/vue3-ts-base/blob/master/src/components/Slider.vue
    const activeKey: Ref<string> = ref('');
    return {
      activeKey
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
      if (this.$route.name !== params.name) {
        const newTagList = this.tagsNavList.filter((item: any) => item.name !== params.name);
        this.setTagNavList(newTagList);
      }
      else {
        const res = this.tagsNavList.filter((item: any) => item.name === params.name);
        this.closeTag(res[0]);
      }
    },
    getTagNavTitle (item: TagNavItem) {
      return item.meta.title;
    },
    ...mapMutations([
      'closeTag',
      'addTag',
      'setTagNavList'
    ])
  },
  created () {
    this.activeKey = this.$route.name as string;
  },
  computed: {
    shouldShowCloseable () {
      return (name: string) => name !== config.homeName;
    }
  },
  watch: {
    '$route': {
      handler (newVal) {
        this.activeKey = newVal.name;
        const { name, meta, params, query } = newVal;
        this.addTag({
          route: { name, meta, params, query },
          type: 'push'
        });
      }
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

.tabs {
  ::v-deep .ant-tabs-tab {
    margin-right: 4px !important;
  }
}

.tab {
  display: inline-block;
  margin: 0 -16px;
  padding: 0 16px;
  font-size: 14px;
  border-bottom: 1px solid #fff;
  .no-select;
}

.icon-close {
  font-size: 13px;
  margin-left: 6px;
  margin-right: -4px !important;
  color: rgba(0, 0, 0, 0.45);
}

</style>
