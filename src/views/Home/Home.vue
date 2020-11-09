<template>
  <Card>
    <h1>
      {{ $t('home') }}
    </h1>
  </Card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Card } from 'ant-design-vue';

@Options({
  components: {
    Card
  }
})

export default class Home extends Vue {
}
</script>

<style scoped>

</style>
