import { axios } from '../base';

export const getRouters = (data: any) => {
    return axios.request({
        url: '/menuList',
        method: 'post',
        data
    });
};
