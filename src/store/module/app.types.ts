import { TagNavItem } from "@/types";

export interface State {
    list: TagNavItem[];
}

export interface AddTag {
    route: TagNavItem;
    type: string;
}
