import Main from "@/components/Main/Main.vue";

const options = {
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login/Login.vue'),
        },
        {
            name: 'root',
            path: '/',
            component: Main,
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('@/views/Home/Home.vue')
                },
                {
                    path: '/user',
                    name: 'user',
                    component: () => import('@/views/User/User.vue')
                },
                {
                    path: '/other',
                    name: 'other',
                    component: () => import('@/views/Other/index.vue')
                },
                {
                    name: '404',
                    path: '/404',
                    component: () => import('@/views/Exception/404.vue')
                },
                {
                    name: '403',
                    path: '/403',
                    component: () => import('@/views/Exception/403.vue')
                }
            ]
        },
    ]
};

export default options;
