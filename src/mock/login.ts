import Mock from 'mockjs';
import { createBaseResponse } from "@/mock/utils";

Mock.mock('/login', 'post', (res: { body: any }, req: any) => {
    const result: any = {};
    const { userName, password } = JSON.parse(res.body);

    if (userName !== 'admin' || password !== 'admin') {
        result.message = '用户名或密码错误';
        return createBaseResponse(result, true);
    }
    else {
        result.message = '操作成功';
        result.userName = userName;
        result.userNick = '超级管理员';
        result.token = 'Authorization:' + Math.random();
        // 默认过期时间为半个小时
        result.expireAt = new Date(new Date().getTime() + 30 * 60 * 1000);
        return createBaseResponse(result);
    }
});
