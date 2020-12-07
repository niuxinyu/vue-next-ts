import axios from 'axios';
import config from '@/config';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

interface AxiosOptions extends AxiosRequestConfig{
    url: string;
    data?: any;
    params?: any;
    headers?: object;
}

const baseURLFromConfig = process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro;

class HttpRequest {
    public baseURL: string;
    public queue: any;

    constructor (baseURL = baseURLFromConfig) {
        this.baseURL = baseURL;
        this.queue = {};
    }

    getDefaultConfig () {
        const config = {
            baseURL: this.baseURL,
            headers: {}
        };
        return config;
    }

    interceptors (instance: AxiosInstance, url: string) {
        // 请求拦截
        instance.interceptors.request.use(config => {
            this.queue[url] = true;
            return config;
        }, error => {
            return Promise.reject(error);
        });
        // 相应拦截
        instance.interceptors.response.use(config => {
            return config;
        });
    }

    request (options: AxiosOptions) {
        const instance = axios.create();
        options = Object.assign(this.getDefaultConfig(), options);
        this.interceptors(instance, options.url);
        return instance(options);
    }
}

