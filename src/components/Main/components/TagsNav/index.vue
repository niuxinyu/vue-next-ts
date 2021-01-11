<template>
  <div class="tags-nav">
    <ATabs
        class="tabs"
        v-model:activeKey="activeKey"
        type="card"
    >
      <ATabPane
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
      </ATabPane>
    </ATabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, toRefs, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { CloseOutlined } from '@ant-design/icons-vue';
import config from '@/config';
import beforeClose from '@/router/before-close';
import { getNextRoute, turnTo } from "@/libs/utils";
import { getMenuName } from "@/libs/tools";
import { TagNavItem } from "@/types";
import { prop } from "vue-class-component";

export default defineComponent({
  name: 'tags-nav',
  components: {
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
  setup (props) {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    // ts 内的setup类型
    // https://github.com/ibwei/vue3-ts-base/blob/master/src/components/Slider.vue
    const activeKey: Ref<string> = ref('');
    const i18n = useI18n();
    const { tagsNavList, currentActiveTag } = toRefs(props);

    const getTagsNavList = computed(() => store.getters['app/getTagsNavList']);
    const shouldShowCloseable = computed(() => (name: string) => name !== config.homeName);

    function handleTabsClick (params: TagNavItem) {
      turnTo(router, '/' + params.name);
      // router.push({
      //   name: params.name
      // });
    }

    function setTagNavList (payload: any) {
      store.commit('app/setTagNavList', payload);
    }

    function closeTag (params: any) {
      const nextRoute = getNextRoute(getTagsNavList.value, params);
      const prevTagNavList = getTagsNavList.value;
      setTagNavList(prevTagNavList.filter((item: TagNavItem) => item.name !== params.name));
      turnTo(router, '/' + nextRoute.name);
      // router.push({
      //   name: nextRoute.name
      // });
    }

    function handleCanCloseTabs (params: TagNavItem) {
      if (route.name !== params.name) {
        const newTagList = tagsNavList.value.filter((item: any) => item.name !== params.name);
        setTagNavList(newTagList);
      }
      else {
        const res = tagsNavList.value.filter((item: any) => item.name === params.name);
        closeTag(res[0]);
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

    function getTagNavTitle (item: TagNavItem) {
      if (config.asyncRoutes) {
        return getMenuName(item, i18n);
      }
      return item.meta.title;
    }

    const addTag = (payload: any) => {
      store.commit('app/addTag', payload);
    };

    watchEffect(() => {
      activeKey.value = route.name as string;
      const { name, meta, params, query } = route;
      addTag({
        route: { name, meta, params, query },
        type: 'push'
      });
    });

    activeKey.value = route.name as string;

    return {
      activeKey,
      i18n,
      handleTabsClick,
      handleTabsClose,
      handleCanCloseTabs,
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
