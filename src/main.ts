import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { InstallCustomCom } from "@/plugins/CustomInstallCom";

// antd vue
import 'ant-design-vue/dist/antd.css';
import './theme/index.less';

// vue i18n
import i18n from "@/language";

const app = createApp(App as any);
InstallCustomCom(app);
app
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app');
// createApp(App).use(store).use(router).mount('#app');
