import type { RouteMeta, RouteRecordRaw } from "vue-router";

export interface AppRouteMeta extends RouteMeta {
    hideInMenu?: boolean;
}

export type AppRouterRecordRaw = RouteRecordRaw & {
    meta?: AppRouteMeta;
}
