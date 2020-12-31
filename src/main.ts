import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { initRouter } from './router';
import store from './store';
import { InstallCustomCom } from "@/plugins/CustomInstallCom";
import bootstrap from '@/bootstrap';
import '@/mock/login';

// antd vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './theme/index.less';

const router = initRouter();

// vue i18n
import i18n from "@/language";

const app = createApp(App);
InstallCustomCom(app);
bootstrap({ router, i18n, store });
app
    .use(store)
    .use(router)
    .use(i18n)
    .use(Antd)
    .mount('#app');
