<template>
  <MenuItem v-bind="$attrs"/>
</template>

<script>
import MenuItem from './MenuItemNode.vue';

export default {
  name: 'MenuNode',
  components: {
    MenuItem
  }
};
</script>
