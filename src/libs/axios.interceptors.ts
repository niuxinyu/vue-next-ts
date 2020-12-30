import { InterceptorFunc } from "@niu_/tools-http-request/types";
import { AxiosError, AxiosResponse } from "axios";

const responseCommon: InterceptorFunc<AxiosResponse, AxiosError> = {
    /**
     * 由于mockjs无法模拟错误的状态码，所以这里需要对 data 中的状态码进行判断解析
     * 对于正常开发而言。status 状态码应该在响应体内自带，具体看和后端的约定
     * **/
    onFulfilled (params: AxiosResponse): any {
        const { data }  = params;
        const status = data.status;
        return { data, status };
    },
    onRejected (error: any) {
        return Promise.reject(error);
    }
};

export default {
    request: [],
    response: [responseCommon]
};
