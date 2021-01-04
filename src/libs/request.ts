import HttpRequest from "@niu_/tools-http-request";
import config from "@/config";
import { Interceptor } from "@niu_/tools-http-request/types";
import { AppBaseOptions } from "@/types";
import Cookies from "js-cookie";
import { xsrfHeaderName } from "@/libs/utils";

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro;

const axios = new HttpRequest(baseUrl);


function checkIsLogin (): boolean {
    return !!Cookies.get(xsrfHeaderName);
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

