import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import { initRouter } from './router';
import bootstrap from '@/bootstrap';
import '@/mock/login';

// antd vue
import 'ant-design-vue/dist/antd.css';
import './theme/index.less';

initRouter();

const app = createApp(App);

bootstrap(app);

app.mount('#app');
