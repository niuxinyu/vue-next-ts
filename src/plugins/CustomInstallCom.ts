import { autoImport } from "@/libs/utils";
import type { App, Component } from 'vue';

const res = autoImport(require.context('../components/custom', true, /.ts$/));

export const setupInstallCom = (app: App) => {
    res.map((com: Component) => {
        app.component(com.name as string, com);
    });
};

