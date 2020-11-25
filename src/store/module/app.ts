import config from '@/config';
import { routeHasExist, getNextRoute } from '@/libs/utils';
import { localRead, localSave } from "@/libs/tools";
import { State, AddTag } from './app.types';
import { TagNavItem } from '@/types';
import router from '@/router';

const homeName = config.homeName;
const tagsNavList = 'tagsNavList';

// 关闭标签页
const closePage = (state: State, route: TagNavItem): void => {
    const nextRoute = getNextRoute(state, route) as TagNavItem;
    state.list = state.list.filter((item: TagNavItem) => {
        return item.name !== route.name;
    });
    router.push({
        name: nextRoute.name
    });
};


export default {
    state: {
        list: []
    },
    mutations: {
        addTag (state: State, payload: AddTag): void {
            const { route, type = 'unshift' } = payload;
            if (!routeHasExist(state.list, route)) {
                if (type === 'push' && route.name !== config.homeName) {
                    state.list.push(route);
                }
                else {
                    if (route.name === homeName) {
                        state.list.unshift(route);
                    }
                    else {
                        state.list.splice(1, 0, route);
                    }
                }
                localSave(tagsNavList, state.list);
            }
        },
        closeTag (state: State, payload: TagNavItem): void {
            if (payload.name === config.homeName) {
                return;
            }
            else {
                // const targetIndex = state.list.findIndex((item: TagNavItem) => item.name === payload.name);
                // if (targetIndex > 0) {
                //     state.list.splice(targetIndex, 1);
                //     closePage(state, payload);
                // }
                closePage(state, payload);
            }
        },
        setTagNavList (state: State, payload: any): void {
            let tagList: any = [];
            if (payload) {
                tagList = [...payload];
            }
            else {
                tagList = JSON.parse(localRead(tagsNavList)) || [];
            }
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
            const homeTagIndex = tagList.find((item: any) => item.name === homeName);
            if (homeTagIndex > 0) {
                const homeTag = tagList.splice(homeTagIndex, 1)[0];
                tagList.unshift(homeTag);
            }
            state.list = tagList;
            localSave(tagsNavList, state.list);
        }
    },
    getters: {
        getTagsNavList: (state: State) => state.list
    }
};
