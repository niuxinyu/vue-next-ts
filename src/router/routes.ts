import Main from '@/components/Main/Main.vue';
import { HomeFilled } from '@ant-design/icons-vue';

const routes: Array<any> = [
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
            title: '用户'
        },
        component: Main,
        children: [
            {
                path: '/user/user-page',
                name: 'user-page',
                meta: {
                    title: '用户1'
                },
                component: () => import('@/views/User/User.vue'),
                children: [
                    {
                        path: '/user/avatar',
                        name: 'avatar',
                        meta: {
                            title: '头像1'
                        }
                    }
                ]
            },
            {
                path: '/name',
                name: 'name',
                meta: {
                    title: '姓名'
                }
            }
        ]
    },
    {
        path: '/other',
        name: 'other',
        meta: {
            title: '其他'
        }
    }
];

export default routes;
