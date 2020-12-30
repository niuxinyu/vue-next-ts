import HttpRequest from "@niu_/tools-http-request";
import { localRead } from "@/libs/tools";
import config from "@/config";
import { Interceptor } from "@niu_/tools-http-request/types";
import { AppBaseOptions } from "@/types";

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro;

const axios = new HttpRequest(baseUrl);


function checkIsLogin (): boolean {
    return !!localRead(process.env.VUE_APP_ROUTES_KEY);
}

function loadInterceptors (interceptors: Interceptor, options: AppBaseOptions): void {
    const { request, response } = interceptors;
    request?.forEach((item) => {
        axios.interceptors({ request: item });
    });

    response?.forEach((item) => {
        axios.interceptors({ response: item });
    });
}

export {
    axios,
    checkIsLogin,
    loadInterceptors
};

