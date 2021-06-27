import { createRouter, createWebHistory, _RouteLocationBase } from 'vue-router';
import config from "@/config";
import type { App } from "vue";
import { loadGuards } from "@/libs/routerUtil";
import guards from "@/router/guards";
import type { AppRouterRecordRaw } from "@/types/app";
import { PageEnum } from "@/enums/pageEnum";


const loginIgnore = {
    names: ['404', "403"],
    paths: ['/login'],
    includes (route: _RouteLocationBase): boolean {
        const name = route.name && typeof route.name === "string" ? route.name : '';
        const path = route.fullPath ? route.fullPath : '';
        return this.names.includes(name) || this.paths.includes(path);
    }
};

export const LoginRouter: AppRouterRecordRaw = {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue'),
    meta: {
        hideInMenu: true
    }
};

export const MainRouter: AppRouterRecordRaw = {
    path: '/',
    redirect: '/' + PageEnum.BASE_HOME,
    name: 'root',
    component: () => import('@/layouts/Main/Main.vue')
};

function initRouter () {
    let options = require('./router').default;
    if (config.asyncRoutes) {
        options = [LoginRouter];
    }
    return createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes: options
    });
}

function setupRouter (app: App) {
    const router = initRouter();
    loadGuards(guards, router);
    app.use(router);
}


export {
    loginIgnore,
    initRouter,
    setupRouter
};
