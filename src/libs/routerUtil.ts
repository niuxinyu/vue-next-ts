import { AppBaseOptions } from "@/types";
import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";
import config from "@/config";
import { localRead } from "@/libs/tools";
import RouteMap from '@/router/async/router.map.ts';
import baseOptions from '@/router/async/router.async.ts';

export const appOptions = {} as AppBaseOptions;

export type CustomRouteRecordRaw = RouteRecordRaw & {
    icon?: string;
}

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
export const parserRouters = (routes: any[]) => {
    const routesResult: CustomRouteRecordRaw[] = [];
    routes.forEach((item: any) => {
        routesResult.push({
            path: RouteMap.routes[item.name].path,
            name: item.name,
            // icon: item.icon,
            component: (item.pid !== undefined && item.pid === 0) ? () => import('@/components/Main/Main.vue') : RouteMap.routes[item.component].component,
            children: parserRouters(item.children)
        });
    });
    return routesResult;
};

/**
 * @date 2021/01/07
 * @desc: 合并路由
 * @author niu
 */
export const mergeRoutes = (target: any[], source: any[]) => {
    const routesMap = {
        routes: [] as any[]
    };
    target.forEach((route: any) => {
        routesMap.routes.push(route);
    });
    source.forEach((route: any) => routesMap.routes.push(route));
    return routesMap;
};

/**
 * @date 2021/01/04
 * @desc: 加载路由
 * @author niu
 */
export const loadRouter = (RouterConfig?: Router[]) => {
    const { store, router } = appOptions;
    if (config.asyncRoutes) {
        if (store.state.app.routerConfig && store.state.app.routerConfig.length) {
            store.commit('app/setMenuList', store.state.app.routerConfig);
            // 需要将原来的路由和新的路由合并 一并初始化后覆盖原来的路由实例
            const res = parserRouters(store.state.app.routerConfig);
            const finalRoutes = mergeRoutes(baseOptions.routes, res);
            createRouter({
                history: createWebHistory(),
                routes: finalRoutes.routes
            });
            console.log(appOptions.router);
            // appOptions.router.addRoute(res[0]);
        }
        else {
            const routers = JSON.parse(localRead(process.env.VUE_APP_ROUTES_KEY) || '[]');
            store.commit('app/setRouterConfig', routers);
            store.commit('app/setMenuList', routers);
            const res = parserRouters(routers);
            const finalRoutes = mergeRoutes(baseOptions.routes, res);
            appOptions.router = createRouter({
                history: createWebHistory(),
                routes: finalRoutes.routes
            });
            console.log(appOptions.router);
            // appOptions.router.addRoute(res[0]);
        }
    }
    else {
        return;
    }
};

export const formatRoutes = (routes: any) => {
    routes.forEach((route: any) => {
        const { path } = route;
        if (!path.startsWith('/') && path !== '*') {
            route.path = '/' + path;
        }
    });
};

