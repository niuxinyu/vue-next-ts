import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import NProgress from '@niu_/tools-nprogress';
import { loginIgnore } from "@/router/index";
import { checkIsLogin } from "@/libs/request";
import { useAppStoreOutSide } from "@/store/module/app";
import type { Router } from 'vue-router';
import { PageEnum } from "@/enums/pageEnum";

const progress = new NProgress().configure({ showSpinner: false });

interface Guard {
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, router: Router): void;
}

const loginGuard: Guard = async (to, from, next, router) => {
    if (!loginIgnore.includes(to) && !checkIsLogin()) {
        next({
            name: 'login'
        });
    }

    if (to.name === PageEnum.BASE_LOGIN) {
        next();
        return;
    }

    const appStore = useAppStoreOutSide();
    if (appStore.getAlreadyAddRoute) {
        next();
        return;
    }
    await appStore.buildRoute(router);
    appStore.setAlreadyAddRoute(true);
    console.log(router.getRoutes());
    next();
};

const progressStart: Guard = (to, from, next) => {
    if (!progress.isStarted()) {
        progress.start();
    }
    next();
};

const progressDone = () => {
    progress.done();
};

export default {
    beforeEach: [progressStart, loginGuard],
    afterEach: [progressDone]
};


