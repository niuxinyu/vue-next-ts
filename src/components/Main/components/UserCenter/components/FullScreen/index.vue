<template>
  <div class="full-screen" @click="handleFullScreenChange">
    <ATooltip>
      <template v-slot:title>
        {{modelValue ? t('exitFullscreen') : t('fullScreen')}}
      </template>
      <FullscreenOutlined/>
    </ATooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FullscreenOutlined } from '@ant-design/icons-vue';
import { usei18n } from '@/libs/tools';

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
    FullscreenOutlined
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const msg = {
      messages: {
        'zh-CN': {
          fullScreen: '全屏',
          exitFullscreen: '退出全屏'
        },
        'zh-TW': {
          fullScreen: '全屏',
          exitFullscreen: '退出全屏'
        },
        'en-US': {
          fullScreen: 'full screen',
          exitFullscreen: 'exit full screen'
        }
      }
    };
    return {
      ...usei18n(msg)
    };
  },
  data () {
    return {
      visible: false
    };
  },
  methods: {
    handleFullScreenChange () {
      this.handleFullscreen();
    },
    handleFullscreen () {
      // 全屏进入和退出
      const main: any = document.body;
      const el: CustomDocument = document;
      if (this.modelValue) {
        if (el.exitFullscreen) {
          el.exitFullscreen();
        }
        else if (el.mozCancelFullScreen) {
          el.mozCancelFullScreen();
        }
        else if (el.webkitCancelFullScreen) {
          el.webkitCancelFullScreen();
        }
        else if (el.msExitFullscreen) {
          el.msExitFullscreen();
        }
      }
      else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        }
        else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        }
        else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        }
        else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
    },
    handleToggleFullScreen () {
      this.$emit('update:modelValue', !this.modelValue);
      this.$emit('on-change', !this.modelValue);
    }
  },
  mounted () {
    const el: CustomDocument = document;
    let isFullscreen: any = el.fullscreenElement || el.mozFullScreenElement || el.webkitFullscreenElement || el.fullScreen || el.mozFullScreen || el.webkitIsFullScreen;
    isFullscreen = !!isFullscreen;
    document.addEventListener('fullscreenchange', this.handleToggleFullScreen);
    document.addEventListener('mozfullscreenchange', this.handleToggleFullScreen);
    document.addEventListener('webkitfullscreenchange', this.handleToggleFullScreen);
    document.addEventListener('msfullscreenchange', this.handleToggleFullScreen);
    this.$emit('update:modelValue', isFullscreen);
  }
});
</script>

<style scoped lang="less">
.full-screen {
  padding: 0 12px;
}
</style>
