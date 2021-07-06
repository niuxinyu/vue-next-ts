import config from '@/config';
import { routeHasExist } from '@/libs/utils';
import { localDel, localRead, localSave } from "@/libs/tools";
import { AddTag } from './app.types';
import { Router } from "vue-router";
import { defineStore } from 'pinia';
import { TagNavItem } from "@/types";
import { store } from "@/store";
import { PageEnum } from "@/enums/pageEnum";
import { resolveAsyncRoute } from "@/libs/routerUtil";

const homeName = config.homeName;
const tagsNavList = 'tagsNavList';

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        list: [],
        routesConfig: [],
        collapsed: false,
        alreadyAddRoute: false
    }),
    actions: {
        addTag (payload: AddTag) {
            const { route, type = 'unshift' } = payload;
            if (route.name === PageEnum.BASE_LOGIN) return;
            if (!routeHasExist(this.list, route)) {
                if (type === 'push' && route.name !== config.homeName) {
                    this.list.push(route);
                }
                else {
                    if (route.name === homeName) {
                        this.list.unshift(route);
                    }
                    else {
                        this.list.splice(1, 0, route);
                    }
                }
                localSave(tagsNavList, this.list);
            }
        },
        setTagNavList (payload?: TagNavItem[]): void {
            let tagList: TagNavItem[] = [];
            if (payload) {
                tagList = [...payload];
            }
            else {
                tagList = JSON.parse(localRead(tagsNavList)) || [];
            }
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
            const homeTagIndex = tagList.findIndex((item: TagNavItem) => item.name === homeName);
            if (homeTagIndex > 0) {
                const homeTag = tagList.splice(homeTagIndex, 1)[0];
                tagList.unshift(homeTag);
            }
            this.list = tagList;
            localSave(tagsNavList, this.list);
        },
        setCollapsed (payload: boolean) {
            this.collapsed = payload;
        },
        setRouterConfig (payload: Router[]) {
            this.routerConfig = payload;
        },
        async logout () {
            localDel(config.VUE_APP_TOKEN);
            return true;
        },
        async setAlreadyAddRoute (payload: boolean) {
            this.alreadyAddRoute = payload;
        },
        async buildRoute (router: Router) {
            await resolveAsyncRoute(router);
            return;
        }
    },
    getters: {
        getTagsNavList (): TagNavItem[] {
            return this.list;
        },
        getCollapsed (): boolean {
            return this.collapsed;
        },
        getAlreadyAddRoute (): boolean {
            return this.alreadyAddRoute;
        }
    }
});

export function useAppStoreOutSide () {
    return useAppStore(store);
}
