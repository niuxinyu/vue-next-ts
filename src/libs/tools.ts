import { createI18n } from 'vue-i18n';

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

export const getMenuName = (menu: any, vm: any): string => {
    return vm.$t(menu.name);
};
