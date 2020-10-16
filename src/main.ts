import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// antd vue
import 'ant-design-vue/dist/antd.css';
import './theme/index.less';

// vue i18n
// import { initI18n } from '@/libs/tools';
// const i18n = initI18n('CN', 'US');

// createApp(App).use(store).use(router).use(i18n).mount('#app');
createApp(App).use(store).use(router).mount('#app');
