import { Component } from 'vue';
import { Router } from 'vue-router';
import { Store } from "vuex";

interface TagNavItem {
    readonly name: string;
    readonly meta: { title: string; icon?: Function; beforeCloseName?: string };
    readonly query: object;
    readonly params: object;
}

interface RouterMap {
    [key: string]: {
        readonly path: string;
        readonly name: string;
        readonly title?: string;
        readonly icon?: Component;
        readonly component: Function;
    };
}

interface AppBaseOptions {
    router: Router;
    store: Store<any>;
    i18n: object;
}

export {
    TagNavItem,
    RouterMap,
    AppBaseOptions
};
