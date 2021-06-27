<template>
  <div class="user-center">
    <FullScreen v-model="shouldFullScreen"/>
    <Notice class="notice"></Notice>
    <User class="user"></User>
    <Language class="language"></Language>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import User from './components/User/index.vue';
import Language from './components/Language/index.vue';
import Notice from './components/Notice/index.vue';
import FullScreen from './components/FullScreen/index.vue';

export default defineComponent({
  name: 'UserCenter',
  components: {
    Notice,
    User,
    Language,
    FullScreen
  },
  data () {
    return {
      shouldFullScreen: false
    };
  }
});
</script>

<style scoped lang="less">
.user-center {
  float: right;
  display: flex;
  margin-right: 15px;
}

.userCenterPadding {
  padding: 0 12px;
  cursor: pointer;
}

::v-deep {
  .notice, .user, .language {
    .userCenterPadding();
  }
}

.notice {
  ::v-deep .anticon {
    font-size: 16px;
  }
}
</style>
