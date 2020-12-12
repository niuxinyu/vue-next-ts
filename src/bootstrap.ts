import { AppBaseOptions } from "./types";
import { setAppOptions, loadRouter, loadGuards } from "@/libs/routerUtil";
import guards from "@/router/guards";

function bootstrap (options: AppBaseOptions) {
    const { router, store, i18n } = options;
    setAppOptions(options);
    loadRouter();
    loadGuards(guards, options);
}

export default bootstrap;
