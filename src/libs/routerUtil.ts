import { Router } from "vue-router";
import { MainRouter } from '@/router';
import config from "@/config";
import { AppRouterRecordRaw } from "@/types/app";

// 注册守卫
export const loadGuards = (guards: { beforeEach: Function[]; afterEach: Function[] }, router: Router): void => {
    const { beforeEach, afterEach } = guards;
    beforeEach.forEach((guard: Function) => {
        router.beforeEach((to, from, next) => guard(to, from, next, router));
    });
    afterEach.forEach((guard: Function) => {
        router.beforeEach((to, from) => guard(to, from, router));
    });
};


export async function resolveAsyncRoute (router: Router) {
    if (config.asyncRoutes) {
        const options = require('@/router/async/router.async').default;
        const routers: AppRouterRecordRaw[] = [];
        Object.keys(options).forEach((key: string) => {
            routers.push(options[key]);
        });
        MainRouter.children = [...routers];
        router.addRoute(MainRouter);
        return;
    }
    return;
}
