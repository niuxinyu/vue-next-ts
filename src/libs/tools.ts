import { createI18n, useI18n, UseI18nOptions } from 'vue-i18n';

export const initI18n = (locale: any, fallback: any, messages?: object): any => {
    const i18nOptions = {
        locale,
        fallbackLocale: fallback,
        silentFallbackWarn: true,
        messages: {
            ...messages
        }
    };
    return createI18n(i18nOptions);
};

// 获取国际化路由名
export const getMenuName = (menu: any, vm: any): string => {
    return vm.$t(menu.name);
};

// 初始化i18n
// 针对于vue3.0的i18n的component使用方式已经发生改变
export const usei18n = (options: UseI18nOptions): object => {
    return useI18n(options);
};

export const localSave = (key: string, params: any): void => {
    window.localStorage.setItem(key, JSON.stringify(params));
};

export const localRead = (key: string): any => {
    return window.localStorage.getItem(key);
};
