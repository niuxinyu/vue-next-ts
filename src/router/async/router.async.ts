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
