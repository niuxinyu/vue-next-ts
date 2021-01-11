

const options = {
    routes: {
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
        }
    } as Record<string, any>
};

export default options;
