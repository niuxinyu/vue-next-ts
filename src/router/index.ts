import { createRouter, createWebHistory, _RouteLocationBase } from 'vue-router';
import config from "@/config";
import { formatRoutes } from "@/libs/routerUtil";

const loginIgnore = {
    names: ['404', "403"],
    paths: ['/login'],
    includes (route: _RouteLocationBase): boolean {
        const name = route.name && typeof route.name === "string" ? route.name : '';
        const path = route.fullPath ? route.fullPath : '';
        return this.names.includes(name) || this.paths.includes(path);
    }
};

function initRouter () {
    const options = config.asyncRoutes ? require('./async/router.async').default : require('./router').default;
    formatRoutes(options.routes);
    return createRouter({
        history: createWebHistory(),
        routes: options.routes
    });
}


export {
    loginIgnore,
    initRouter
};
