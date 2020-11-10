import { TagNavItem } from '@/types';
import { State } from '@/store/module/app.types';

/**
 * 判断给定的路由是否已经存在于TagsNavList中
 * **/
export const routeHasExist = (tagsNavList: TagNavItem[], routerItem: TagNavItem): boolean => {
    return tagsNavList.findIndex((item: TagNavItem) => item.name === routerItem.name) >= 0;
};

/**
 * 获得可以跳转的下一个路由哦
 * **/
export const getNextRoute = (state: State, list: TagNavItem): void => {
    const res = {};
    if (state.list.length === 2) {
        // res = getHomeRoute(state.list);
    }
};

/**
 * 获得tagsNavList内的config homeName 页面
 * **/
export const getHomeRoute = (list: TagNavItem[], homeName = ''): void => {
    //
};
