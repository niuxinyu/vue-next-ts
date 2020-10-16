<template>
  <MenuItem v-bind="$attrs"/>
</template>

<script>
import MenuItem from './MenuItemNode';

export default {
  name: 'MenuNode',
  components: {
    MenuItem
  }
};
</script>
