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
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import type { Ref, PropType } from 'vue';
import {
  Tabs
} from 'ant-design-vue';
import { TagNavItem } from "@/types";
import { CloseOutlined } from '@ant-design/icons-vue';
import beforeClose from '@/router/before-close';
import { getNextRoute } from "@/libs/utils";
import { useGo } from "@/hooks/app";
import { useRoute } from "vue-router";
import { useAppStoreOutSide } from "@/store/module/app";
import { PageEnum } from "@/enums/pageEnum";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'tags-nav',
  components: {
    CloseOutlined,
    Tabs,
    TabPane: Tabs.TabPane
  },
  props: {
    tagsNavList: {
      type: Array as PropType<TagNavItem[]>,
      default: () => []
    },
    currentActiveTag: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const go = useGo();
    const route = useRoute();
    const appStore = useAppStoreOutSide();

    function handleTabsClick (params: TagNavItem) {
      go(params.name);
    }

    function closeTag (params: TagNavItem) {
      const nextRoute = getNextRoute(appStore.getTagsNavList, params);
      const prevTagNavList = appStore.getTagsNavList;
      appStore.setTagNavList(prevTagNavList.filter((item: TagNavItem) => item.name !== params.name));
      go(nextRoute.name);
    }

    function handleCanCloseTabs (params: TagNavItem) {
      if (route.name !== params.name) {
        const newTagList = props.tagsNavList.filter((item: TagNavItem) => item.name !== params.name);
        appStore.setTagNavList(newTagList);
      }
      else {
        const res = props.tagsNavList.filter((item: TagNavItem) => item.name === params.name);
        closeTag(res[0] as TagNavItem);
      }
    }

    function handleTabsClose (params: TagNavItem) {
      if (params.meta && params.meta.beforeCloseName && params.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[params.meta.beforeCloseName]).then(res => {
          res && handleCanCloseTabs(params);
        });
      }
      else {
        handleCanCloseTabs(params);
      }
    }

    const { t } = useI18n();

    function getTagNavTitle (item: TagNavItem) {
      return t(item.name as string);
    }

    const activeKey: Ref<string> = ref('');
    onMounted(() => {
      activeKey.value = route.name as string;
    });

    const shouldShowCloseable = computed(() => {
      return (name: string) => name !== PageEnum.BASE_HOME;
    });

    watch(() => route.name, () => {
      activeKey.value = route.name as string;
      const { name, meta, params, query } = route;
      appStore.addTag({
        route: { name, meta, params, query },
        type: 'push'
      });
    });

    return {
      activeKey,
      handleTabsClick,
      handleTabsClose,
      getTagNavTitle,
      shouldShowCloseable
    };
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
