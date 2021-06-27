<template>
  <Card>
    <h1>
      {{ t('home') }}
    </h1>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Card
} from 'ant-design-vue';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'Home',
  components: {
    Card
  },
  setup () {
    const { t } = useI18n();
    return {
      t
    };
  }
});
</script>

<style scoped>

</style>
