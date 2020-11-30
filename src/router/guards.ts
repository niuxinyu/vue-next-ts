import NProgress from "@/components/NProgress/NProgress";

const progress = new NProgress().configure({ showSpinner: false });

const progressStart = (to: Function, from: Function, next: Function) => {
    if (!progress.isStarted()) {
        progress.start();
    }
    next();
};


