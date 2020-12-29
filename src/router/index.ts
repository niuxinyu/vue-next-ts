import { createRouter, createWebHistory, _RouteLocationBase } from 'vue-router';
import config from "@/config";

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
    return createRouter({
        history: createWebHistory(process.env.BASE_URL),
        routes: options
    });
}


export {
    loginIgnore,
    initRouter
};
