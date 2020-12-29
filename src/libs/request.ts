import HttpRequest from "@niu_/tools-http-request";
import { localRead } from "@/libs/tools";

const axios = new HttpRequest();


function checkIsLogin (): boolean {
    return !!localRead(process.env.VUE_APP_ROUTES_KEY);
}

export {
    checkIsLogin
};

