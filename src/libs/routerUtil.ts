import { AppBaseOptions, RouterConfig, RouterMap } from "@/types";
import { Router } from "vue-router";
import { Component } from 'vue';
import config from "@/config";
import { localRead } from "@/libs/tools";

const appOptions = {} as AppBaseOptions;

/**
 * @date 2021/01/04
 * @desc: 保存配置
 * @author niu
 */
export const setAppOptions = (options: AppBaseOptions): void => {
    const { router, store, i18n } = options;
    appOptions.router = router;
    appOptions.store = store;
    appOptions.i18n = i18n;
};

/**
 * @date 2021/01/04
 * @desc: 加载路由
 * @author niu
 */
export const loadRouter = (RouterConfig?: Router[]) => {
    const { store } = appOptions;
    if (config.asyncRoutes) {
        if (store.state.app.routerConfig && store.state.app.routerConfig.length) {
            store.commit('app/setMenuList', store.state.app.routerConfig);
        }
        else {
            const routers = JSON.parse(localRead(process.env.VUE_APP_ROUTES_KEY) || '[]');
            store.commit('app/setRouterConfig', routers);
            store.commit('app/setMenuList', routers);
        }
    }
    else {
        return;
    }
};

/**
 * @date 2021/01/04
 * @desc: 加载守卫
 * @author niu
 */
export const loadGuards = (guards: { beforeEach: Function[]; afterEach: Function[] }, options: AppBaseOptions): void => {
    const { beforeEach, afterEach } = guards;
    const { router } = options;
    beforeEach.forEach((guard: Function) => {
        router.beforeEach((to, from, next) => guard(to, from, next));
    });
    afterEach.forEach((guard: Function) => {
        router.beforeEach((to, from) => guard(to, from, options));
    });
};

/**
 * @date 2021/01/04
 * @desc: 解析路由
 * @author niu
 */

export const parserRouter = (routerConfig: (string | RouterConfig)[], routerMap: RouterMap) => {
    const routes: any = [];
    routerConfig.forEach((item) => {
        let route: Record<string, any> = {};
        if (typeof item === 'string' && routerMap[item]) {
            route = routerMap[item];
        }
        else if (typeof item === 'object') {
            route = routerMap[(item.router as string)];
        }
        routes.push(route);
    });
    return routes;
};

export const formatRoutes = (routes: any) => {
    routes.forEach((route: any) => {
        const { path } = route;
        if (!path.startsWith('/') && path !== '*') {
            route.path = '/' + path;
        }
    });
};
