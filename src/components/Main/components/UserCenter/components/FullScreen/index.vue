<template>
  <div class="full-screen" @click="handleFullscreen">
    <Tooltip>
      <template v-slot:title>
        全屏
      </template>
      <FullscreenOutlined/>
    </Tooltip>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {Tooltip} from 'ant-design-vue';
import {FullscreenOutlined} from '@ant-design/icons-vue';

interface CustomDocument extends Document {
  mozFullScreenElement?: Element;
  webkitFullscreenElement?: Element;
  fullScreen?: Element;
  mozFullScreen?: Element;
  webkitIsFullScreen?: Element;
  mozCancelFullScreen?: () => void;
  webkitCancelFullScreen?: () => void;
  msExitFullscreen?: () => void;
}

export default defineComponent({
  name: 'FullScreen',
  components: {
    FullscreenOutlined,
    Tooltip
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    handleFullscreen() {
      // 全屏进入和退出
      const main: any = document.body;
      const el = <CustomDocument>document;
      if (this.value) {
        if (el.exitFullscreen) {
          el.exitFullscreen();
        } else if (el.mozCancelFullScreen) {
          el.mozCancelFullScreen();
        } else if (el.webkitCancelFullScreen) {
          el.webkitCancelFullScreen();
        } else if (el.msExitFullscreen) {
          el.msExitFullscreen();
        }
      } else if (main.requestFullscreen) {
        main.requestFullscreen();
      } else if (main.mozRequestFullScreen) {
        main.mozRequestFullScreen();
      } else if (main.webkitRequestFullScreen) {
        main.webkitRequestFullScreen();
      } else if (main.msRequestFullscreen) {
        main.msRequestFullscreen();
      }
    }
  },
  mounted() {
    const el = <CustomDocument>document;
    let isFullscreen: any = el.fullscreenElement || el.mozFullScreenElement || el.webkitFullscreenElement || el.fullScreen || el.mozFullScreen || el.webkitIsFullScreen;
    isFullscreen = !!isFullscreen;
    document.addEventListener('fullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    document.addEventListener('msfullscreenchange', () => {
      this.$emit('input', !this.value);
      this.$emit('on-change', !this.value);
    });
    this.$emit('input', isFullscreen);
  }
});
</script>

<style scoped lang="less">
.full-screen {
  padding: 0 12px;
}
</style>
