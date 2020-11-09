import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// antd vue
import 'ant-design-vue/dist/antd.css';
import './theme/index.less';

// vue i18n
import i18n from "@/language";

createApp(App as any)
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app');
// createApp(App).use(store).use(router).mount('#app');
