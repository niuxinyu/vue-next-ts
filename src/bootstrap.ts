import type { App } from "vue";
import { setupStore } from "@/store";
import { setupRouter } from "@/router";
import { setupInstallCom } from "@/plugins/CustomInstallCom";
import { setupI18n } from '@/language';

function bootstrap (app: App<Element>) {
    setupStore(app);
    setupRouter(app);
    setupInstallCom(app);
    setupI18n(app);
}

export default bootstrap;
