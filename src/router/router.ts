import { DotChartOutlined, HomeFilled, UserOutlined } from "@ant-design/icons-vue";
import Main from '@/layouts/Main/Main.vue';
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        meta: {
            hideInMenu: true
        },
        component: () => import('@/views/Login/Login.vue')
    },
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        meta: {
            title: '首页',
            icon: HomeFilled
        },
        component: Main,
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页1'
                },
                component: () => import('@/views/Home/Home.vue')
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            title: '用户',
            icon: UserOutlined
        },
        component: Main,
        children: [
            {
                path: '/user/user-page',
                name: 'user-page',
                meta: {
                    title: '用户1',
                    icon: UserOutlined
                },
                component: () => import('@/views/User/User.vue')
            }
        ]
    },
    {
        path: '/other',
        name: 'other',
        meta: {
            title: '其他',
            icon: DotChartOutlined
        },
        component: Main,
        children: [
            {
                path: 'other-page',
                name: 'other-page',
                meta: {
                    title: '其他',
                    icon: DotChartOutlined
                },
                component: () => import('@/views/Other/index.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/ErrorPage/ErrorPage.vue')
    },
];

export default routes;
