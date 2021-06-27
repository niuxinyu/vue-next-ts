import type { RouteLocationRaw, Router } from "vue-router";
import { useRouter } from "vue-router";
import { PageEnum } from "@/enums/pageEnum";
import { MenuState } from "@/layouts/Main/types";
import { computed } from "vue";
import { useAppStoreOutSide } from "@/store/module/app";

function handleError (err: Error) {
    console.log(err);
}

export function useGo (_router?: Router) {
    let router;
    if (!_router) {
        router = useRouter();
    }

    // @ts-ignore
    const { push, replace } = _router || router;

    return function (_opt: RouteLocationRaw | string = PageEnum.BASE_HOME, isReplace = false) {
        if (!_opt) return;
        if (typeof _opt === 'object' || _opt.includes('/')) {
            isReplace ? replace(_opt).catch(handleError) : push(_opt).catch(handleError);
        }
        else {
            isReplace ?
                replace({
                    name: _opt
                }).catch(handleError)
                : push({
                    name: _opt
                }).catch(handleError);
        }
    };
}

export function useOpenKeys (
    menuState: MenuState
) {
    async function setOpenKeys (path: string) {
        menuState.openKeys = [path];
    }

    const getOpenKeys = computed(() => {
        return menuState.openKeys;
    });

    return {
        setOpenKeys,
        getOpenKeys
    };
}

export function useMenuSetting () {
    const appStore = useAppStoreOutSide();

    function setCollapsed (payload: boolean) {
        appStore.setCollapsed(payload);
    }

    const getCollapsed = computed(() => appStore.getCollapsed);

    return {
        setCollapsed,
        getCollapsed,
    };
}
