import { TagNavItem } from '@/types';
import { State } from '@/store/module/app.types';
import config from '@/config';

/**
 * 判断给定的路由是否已经存在于TagsNavList中
 * **/
export const routeHasExist = (tagsNavList: TagNavItem[], routerItem: TagNavItem): boolean => {
    return tagsNavList.findIndex((item: TagNavItem) => item.name === routerItem.name) >= 0;
};

/**
 * 获得可以跳转的下一个路由
 * **/
export const getNextRoute = (state: State, route: TagNavItem): object => {
    let res = {};
    if (state.list.length === 2) {
        res = state.list.find((item: TagNavItem) => item.name === config.homeName)!;
    }
    else {
        const targetIndex = state.list.findIndex((item: TagNavItem) => item.name === route.name);
        if (targetIndex === state.list.length - 1) {
            res = state.list[state.list.length - 2];
        }
        else {
            res = state.list[targetIndex + 1];
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
