import { createI18n } from 'vue-i18n';


export const initI18n = (locale: string, fallback: string, messages?: object) => {
    const i18nOptions = {
        legacy: false,
        locale,
        fallbackLocale: fallback,
        silentFallbackWarn: true,
        messages: {
            ...messages
        }
    };
    return createI18n(i18nOptions);
};

export const localSave = (key: string, params: any): void => {
    window.localStorage.setItem(key, JSON.stringify(params));
};

export const localRead = (key: string): any => {
    return window.localStorage.getItem(key);
};

export function localDel (key: string) {
    return window.localStorage.removeItem(key);
}

export const hasOwnProperty = (source: Record<string, any>, key: string): boolean => {
    return Object.prototype.hasOwnProperty.call(source, key);
};
