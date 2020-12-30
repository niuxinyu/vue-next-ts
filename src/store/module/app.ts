import config from '@/config';
import { routeHasExist } from '@/libs/utils';
import { localRead, localSave } from "@/libs/tools";
import { State, AddTag } from './app.types';
import { Router } from "vue-router";

const homeName = config.homeName;
const tagsNavList = 'tagsNavList';

export default {
    namespace: true,
    state: {
        list: [],
        routesConfig: []
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
        },
        setRouterConfig (state: State, payload: Router[]) {
            state.routerConfig = payload;
        }
    },
    getters: {
        getTagsNavList: (state: State) => state.list
    }
};
