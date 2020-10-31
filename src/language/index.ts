import { createApp } from 'vue';
import { initI18n } from '@/libs/tools';
import customZhCn from './lang/zh-CN';
import customZhTw from './lang/zh-TW';
import customEnUs from './lang/en-US';


// 自动根据浏览器系统语言设置语言
const navLang = navigator.language;
// todo 实现根据本地浏览器网页加载不同语言的功能
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;

const messages = {
    'zh-CN': customZhCn,
    'zh-TW': customZhTw,
    'en-US': customEnUs
};

const i18n = initI18n('zh-CN', 'en-US', messages);

const app = createApp({});
app.use(i18n);

export default i18n;

