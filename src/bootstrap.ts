import { AppBaseOptions } from "./types";
import { setAppOptions, loadRouter } from "@/libs/routerUtil";

function bootstrap (options: AppBaseOptions) {
    const { router, store, i18n } = options;
    setAppOptions(options);
    loadRouter();
    return;
}

export default bootstrap;
