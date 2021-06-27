import type { App } from 'vue';
import { createPinia } from 'pinia';
import { createLogger } from "@/store/plugin/logger";

const store = createPinia();

store.use(createLogger());

export function setupStore (app: App) {
    app.use(store);
}

export {
    store
};
