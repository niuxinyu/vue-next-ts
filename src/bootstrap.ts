import { AppBaseOptions } from "./types";
import { setAppOptions, loadRouter, loadGuards } from "@/libs/routerUtil";
import guards from "@/router/guards";
import { loadInterceptors } from '@/libs/request';
import interceptors from '@/libs/axios.interceptors';

function bootstrap (options: AppBaseOptions) {
    setAppOptions(options);
    loadInterceptors(interceptors, options);
    loadRouter();
    loadGuards(guards, options);
}

export default bootstrap;
