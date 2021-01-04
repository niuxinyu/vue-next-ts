// import { RouterMap } from '@/types';
// import { HomeFilled, DotChartOutlined, UserOutlined } from '@ant-design/icons-vue';
//
// const Main = () => import('@/components/Main/Main.vue');
//
// // 路由组件注册
// const temp: RouterMap = {
//     login: {
//         path: '/login',
//         name: 'login',
//         meta: {
//             hideInMenu: true
//         },
//         component: () => import('@/views/Login/Login.vue')
//     },
//     home: {
//         name: 'home',
//         path: '/home',
//         title: '首页',
//         icon: HomeFilled,
//         component: () => import('@/views/Home/Home.vue')
//     },
//     user: {
//         name: 'user',
//         path: '/user',
//         title: '用户',
//         icon: UserOutlined,
//         component: () => import('@/views/User/User.vue')
//     },
//     other: {
//         name: 'other',
//         path: '/other',
//         title: '其他',
//         icon: DotChartOutlined,
//         component: () => import('@/views/Other/index.vue')
//     }
// };
//
// export default temp;

import { parserRouter } from '@/libs/routerUtil';
import { routerMap } from "@/router/async/router.map";
import { RouterConfig } from "@/types";

const routesConfig: (string | RouterConfig)[] = [
    'login',
    'home',
    {
        router: '404',
        path: '/:pathMatch(.*)*',
        name: '404'
    },
    {
        router: '403',
        path: '/403',
        name: '403'
    }
];

const options = {
    routes: parserRouter(routesConfig, routerMap)
};

export default options;
