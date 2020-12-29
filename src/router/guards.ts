import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { AppBaseOptions } from "@/types";
import NProgress from '@niu_/tools-nprogress';
import { loginIgnore } from "@/router/index";
import { checkIsLogin } from "@/libs/request";

const progress = new NProgress().configure({ showSpinner: false });

interface Guard {
    (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext, options: AppBaseOptions): void;
}

const loginGuard: Guard = (to, from, next, options) => {
    if (!loginIgnore.includes(to) && !checkIsLogin()) {
        next({
            name: 'login'
        });
    }
    else {
        next();
    }
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


