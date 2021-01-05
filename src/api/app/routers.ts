import { axios } from '../base';

export const getRouters = () => {
    return axios.request({
        url: '/menuList',
        method: 'post'
    });
};
