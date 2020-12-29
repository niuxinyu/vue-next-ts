<template>
  <ACard>
    <h1>
      {{ $t('home') }}
    </h1>
  </ACard>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Home extends Vue {
}
</script>

<style scoped>

</style>
