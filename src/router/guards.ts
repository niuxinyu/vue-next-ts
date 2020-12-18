import { NavigationGuardNext } from "vue-router";
import { AppBaseOptions } from "@/types";
import { Route } from "ant-design-vue/types/breadcrumb/breadcrumb";
import NProgress  from '@niu_/tools-nprogress';

const progress = new NProgress().configure({ showSpinner: false });

interface Guard {
    (to: Route, from: Route, next: NavigationGuardNext, options: AppBaseOptions): void;
}

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
    beforeEach: [progressStart],
    afterEach: [progressDone]
};


