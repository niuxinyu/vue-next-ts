import { AppBaseOptions } from "@/types";
import { Router } from "vue-router";
import app from "@/store/module/app";
const appOptions = {} as AppBaseOptions;

export const setAppOptions = (options: AppBaseOptions): void => {
    const { router, store, i18n } = options;
    appOptions.router = router;
    appOptions.store = store;
    appOptions.i18n = i18n;
};

export const loadRouter = (RouterConfig?: Router[]) => {
    const { store } = appOptions;
    if (RouterConfig) {
        store.commit('app/setRouterConfig', RouterConfig);
    }
};
