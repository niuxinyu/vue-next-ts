import { PiniaPluginContext } from "pinia";
import { deepCopy } from "@/libs/utils";

let isRegistered = false;

function repeat (str: string, times: number) {
    return (new Array(times + 1)).join(str);
}

function pad (num: number, maxLength: number) {
    return repeat('0', maxLength - num.toString().length) + num;
}

function getFormattedTime () {
    const time = new Date();
    return ` @ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(time.getSeconds(), 2)}.${pad(time.getMilliseconds(), 3)}`;
}

const transformer = (s: any) => s;

function startMessage (logger: Console, message: string, collapsed: boolean) {
    const startMessage = collapsed
        ? logger.groupCollapsed
        : logger.group;

    // render
    try {
        startMessage.call(logger, message);
    } catch (e) {
        logger.log(message);
    }
}

function endMessage (logger: Console) {
    try {
        logger.groupEnd();
    } catch (e) {
        logger.log('—— log end ——');
    }
}

export function createLogger ({ collapsed = false } = {}) {
    return function useLogger (context: PiniaPluginContext) {
        if (!isRegistered) {
            const { store } = context;
            const prevState = deepCopy(store.$state);
            // @ts-ignore
            store.$onAction(({ store, name }) => {
                const state = store.$state;
                const nextState = deepCopy(state);
                const formattedTime = getFormattedTime();
                const message = `mutation ${name}${formattedTime}`;

                startMessage(console, message, collapsed);
                console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
                console.log('%c mutation', 'color: #03A9F4; font-weight: bold', name);
                console.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
                endMessage(console);
            });
        }
        isRegistered = true;
    };
}
