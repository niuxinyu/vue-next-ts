import config from '@/config';
import { routeHasExist } from '@/libs/utils';
import { TagNavItem } from '@/types';
import router from "@/router";

const homeName = config.homeName;

interface State {
    list: TagNavItem[];
}

interface AddTag {
    route: TagNavItem;
    type: string;
}

export default {
    state: {
        list: []
    },
    mutations: {
        addTag (state: State, payload: AddTag): void {
            const { route, type = 'unshift' } = payload;
            if (!routeHasExist(state.list, route)) {
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
        },
        setTagNavList (state: State, payload: any): void {
            let tagList: any = [];
            if (payload) {
                tagList = [...payload];
            }
            if (tagList[0] && tagList[0].name !== homeName) tagList.shift();
            const homeTagIndex = tagList.find((item: any) => item.name === homeName);
            if (homeTagIndex > 0) {
                const homeTag = tagList.splice(homeTagIndex, 1)[0];
                tagList.unshift(homeTag);
            }
        }
    },
    getters: {
        getTagsNavList: (state: State) => state.list
    }
};
