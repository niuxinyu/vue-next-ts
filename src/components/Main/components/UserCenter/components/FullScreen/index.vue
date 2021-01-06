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
import { defineComponent, ref, toRefs, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { FullscreenOutlined } from '@ant-design/icons-vue';

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
  setup (props, context) {
    const visible = ref(false);
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
    const { modelValue } = toRefs(props);
    const { t } = useI18n({
      ...msg
    });

    const handleFullscreen = () => {
      // 全屏进入和退出
      const main: any = document.body;
      const el: CustomDocument = document;
      if (modelValue.value) {
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
    };

    const handleFullScreenChange = () => {
      handleFullscreen();
    };

    const handleToggleFullScreen = () => {
      context.emit('update:modelValue', !modelValue.value);
      context.emit('on-change', modelValue.value);
    };

    onMounted(() => {
      const el: CustomDocument = document;
      let isFullscreen: any = el.fullscreenElement || el.mozFullScreenElement || el.webkitFullscreenElement || el.fullScreen || el.mozFullScreen || el.webkitIsFullScreen;
      isFullscreen = !!isFullscreen;
      document.addEventListener('fullscreenchange', handleToggleFullScreen);
      document.addEventListener('mozfullscreenchange', handleToggleFullScreen);
      document.addEventListener('webkitfullscreenchange', handleToggleFullScreen);
      document.addEventListener('msfullscreenchange', handleToggleFullScreen);
      context.emit('update:modelValue.value', isFullscreen);
    });

    return {
      t,
      visible,
      handleFullscreen,
      handleFullScreenChange,
      handleToggleFullScreen
    };
  }
});
</script>

<style scoped lang="less">
.full-screen {
  padding: 0 12px;
}
</style>
