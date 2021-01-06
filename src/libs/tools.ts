import { createI18n, useI18n, UseI18nOptions } from 'vue-i18n';

interface CusObject {
    [key: string]: any;
}

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
export const getMenuName = (menu: any, i18n: any): string => {
    return i18n.t(menu.name);
};

export const localSave = (key: string, params: any): void => {
    window.localStorage.setItem(key, JSON.stringify(params));
};

export const localRead = (key: string): any => {
    return window.localStorage.getItem(key);
};

export const hasOwnProperty = (source: CusObject, key: string): boolean => {
    return Object.prototype.hasOwnProperty.call(source, key);
};
