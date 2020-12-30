import { axios } from "./base";

// 登录
export const login = (params: any) => {
    return axios.request({
        url: '/login',
        data: params,
        method: 'post'
    });
};
