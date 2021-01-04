import { Component } from 'vue';
import { Router } from 'vue-router';
import { Store } from "vuex";
import { AntdComponent } from "ant-design-vue/types/component";

interface TagNavItem {
    name: string;
    meta: { title: string; icon?: Function; beforeCloseName?: string };
    query: object;
    params: object;
}

interface RouterMap {
    [key: string]: {
        path: string;
        name: string;
        title?: string;
        icon?: Component;
        redirect?: string;
        component: Function;
        meta?: {
            hideInMenu?: boolean;
            icon?: AntdComponent;
        };
        children?: RouterMap[];
    };
}

interface RouterConfig {
    router?: string;
    path: string;
    name: string;
    title?: string;
    redirect?: string;
    component?: () => Promise<any>;
    meta?: {
        hideInMenu?: boolean;
        icon?: AntdComponent;
    };
    children?: RouterMap[];
}

interface AppBaseOptions {
    router: Router;
    store: Store<any>;
    i18n: object;
}

export {
    TagNavItem,
    RouterMap,
    RouterConfig,
    AppBaseOptions
};
