import { TagNavItem } from "@/types";
import { Router } from "vue-router";

export interface State {
    list: TagNavItem[];
    routerConfig: Router[];
}

export interface AddTag {
    route: TagNavItem;
    type: 'unshift' | 'push';
}
