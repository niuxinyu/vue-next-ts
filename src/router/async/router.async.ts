import { RouterMap } from '@/types';
import { HomeFilled, DotChartOutlined, UserOutlined } from '@ant-design/icons-vue';

const Main = () => import('@/components/Main/Main.vue');

// 路由组件注册
const temp: RouterMap = {
    login: {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login/Login.vue')
    },
    home: {
        name: 'home',
        path: '/home',
        title: '首页',
        icon: HomeFilled,
        component: () => import('@/views/Home/Home.vue')
    },
    user: {
        name: 'user',
        path: '/user',
        title: '用户',
        icon: UserOutlined,
        component: () => import('@/views/User/User.vue')
    },
    other: {
        name: 'other',
        path: '/other',
        title: '其他',
        icon: DotChartOutlined,
        component: () => import('@/views/Other/index.vue')
    }
};

