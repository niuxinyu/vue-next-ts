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
        return createBaseResponse(result);
    }
});
