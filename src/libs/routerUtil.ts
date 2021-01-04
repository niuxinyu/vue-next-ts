import { AppBaseOptions, RouterConfig, RouterMap } from "@/types";
import { Router } from "vue-router";
import { AntdComponent } from "ant-design-vue/types/component";

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
    if (RouterConfig) {
        store.commit('app/setRouterConfig', RouterConfig);
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
        let router,
            routeConfig = {} as Record<string, any>;
        if (typeof item === 'string' && routerMap[item]) {
            router = routerMap[item];
            routeConfig = { path: router.path || item, router: item };
        }
        else if (typeof item === 'object') {
            router = routerMap[(item.router as any)];
            routeConfig = item;
        }


        // 从 router 和 routerConfig 解析单个路由
        const route = {
            path: routeConfig.path || router?.path || routeConfig.router,
            name: routeConfig.name || router?.name,
            component: routeConfig.component || router?.component,
            redirect: routeConfig.redirect || router?.redirect,
            meta: {
                icon: (routeConfig.icon as AntdComponent) || router?.icon
            },
            hideInMenu: false,
            children: {}
        };

        if (routeConfig.meta?.hideInMenu || router?.meta?.hideInMenu) {
            route.hideInMenu = true;
        }
        if (routeConfig.children && routeConfig.children.length > 0) {
            route.children = parserRouter(routeConfig.children, routerMap);
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
