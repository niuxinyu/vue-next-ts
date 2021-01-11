import { TagNavItem } from '@/types';
import { State } from '@/store/module/app.types';
import config from '@/config';
import Cookies from "js-cookie";
import { Router } from "vue-router";

// 跨域认证信息 header 名
export const xsrfHeaderName = 'Authorization';

/**
 * 判断给定的路由是否已经存在于TagsNavList中
 * **/
export const routeHasExist = (tagsNavList: TagNavItem[], routerItem: TagNavItem): boolean => {
    return tagsNavList.findIndex((item: TagNavItem) => item.name === routerItem.name) >= 0;
};

/**
 * 获得可以跳转的下一个路由
 * **/
export const getNextRoute = (list: TagNavItem[], route: TagNavItem): TagNavItem => {
    let res = {} as TagNavItem;
    if (list.length === 2) {
        res = list.find((item: TagNavItem) => item.name === config.homeName)!;
    }
    else {
        const targetIndex = list.findIndex((item: TagNavItem) => item.name === route.name);
        if (targetIndex === list.length - 1) {
            res = list[list.length - 2];
        }
        else {
            res = list[targetIndex + 1];
        }
    }
    return res;
};

/**
 * 获得tagsNavList内的config homeName 页面
 * **/
export const getHomeRoute = (list: TagNavItem[], homeName = ''): void => {
    //
};

/**
 * 自动导入
 * **/
export const autoImport = (r: __WebpackModuleApi.RequireContext): any[] => {
    const __modules: any = [];
    r.keys().forEach((k: any) => {
        Object.keys(r(k)).forEach(key => {
            __modules.push(
                r(k)[key]
            );
        });
    });
    return __modules;
};


/**
 * @date 2021/01/04
 * @desc: 存储认证信息
 * @author niu
 */
export function setAuthorization (auth: { token: string; expireAt: Date }) {
    Cookies.set(xsrfHeaderName, 'Bearer ' + auth.token, { expires: auth.expireAt });
}

/**
 * @date 2021/01/11
 * @desc: 路由跳转方法 使用了addRoute push 就不好使了，也不知道为啥
 * @author niu
*/
export const turnTo = (router: Router, path: string) => {
    router.replace({
        path: path
    });
};
