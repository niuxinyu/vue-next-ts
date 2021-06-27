const { VUE_APP_API_BASE_URL, VUE_APP_ROUTES_KEY, VUE_APP_USER_KEY, VUE_APP_TOKEN } = process.env;

export default {
    homeName: 'home',
    multiPage: true,
    asyncRoutes: true, // 是否异步路由
    useI18n: true,
    VUE_APP_API_BASE_URL,
    VUE_APP_ROUTES_KEY,
    VUE_APP_USER_KEY,
    VUE_APP_TOKEN
};
