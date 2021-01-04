import { RouterMap } from "@/types";

const routerMap: RouterMap = {
    login: {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/Login.vue')
    },
    home: {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home/Home.vue')
    },
    user: {
        path: '/user',
        name: 'user',
        component: () => import('@/views/User/User.vue')
    },
    other: {
        path: '/other',
        name: 'other',
        component: () => import('@/views/Other/index.vue')
    }
};

export {
    routerMap
};
