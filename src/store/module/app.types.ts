import { TagNavItem } from "@/types";
import { Router } from "vue-router";

export interface State {
    list: TagNavItem[];
    routerConfig: Router[];
    menuList: any[];
}

export interface AddTag {
    route: TagNavItem;
    type: string;
}
