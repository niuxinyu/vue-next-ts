import { TagNavItem } from '@/types';
import config from '@/config';

export const xsrfHeaderName = process.env.VUE_APP_TOKEN;

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
    let res: TagNavItem;
    if (list.length === 2) {
        res = list.find((item: TagNavItem) => item.name === config.homeName) as TagNavItem;
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

// /**
//  * 获得tagsNavList内的config homeName 页面
//  * **/
// export const getHomeRoute = (list: TagNavItem[], homeName = ''): void => {
//     //
// };

/**
 * 自动导入
 * **/
/* eslint-disable */
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

export function find (list: any, f: any) {
    return list.filter(f)[0]
}

export function deepCopy (obj: any, cache: any = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // if obj is hit, it is in circular structure
    const hit = find(cache, (c: any) => c.original === obj)
    if (hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
        original: obj,
        copy
    })

    Object.keys(obj).forEach(key => {
        // @ts-ignore
        copy[key] = deepCopy(obj[key], cache)
    })

    return copy
}
