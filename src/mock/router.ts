import Mock from "mockjs";
import { createBaseResponse } from "@/mock/utils";

Mock.mock('/menuList', 'post', (res: any, req: any) => {
    const result = {} as Record<string, any>;
    result.menuList = [
        {
            path: '/',
            name: '首页',
            menuId: 1,
            mata: {},
            children: [
                {
                    path: '/home',
                    name: '首页',
                    menuId: '1-1',
                    meta: {},
                    children: []
                }
            ]
        },
        {
            path: '/user',
            name: '用户',
            menuId: 2,
            mata: {},
            children: [
                {
                    path: '/user',
                    name: '用户',
                    menuId: '2-1',
                    meta: {},
                    children: []
                }
            ]
        },
        {
            path: '/other',
            name: '其他',
            menuId: 3,
            mata: {},
            children: [
                {
                    path: '/other',
                    name: '其他',
                    menuId: '3-1',
                    meta: {},
                    children: []
                }
            ]
        }
    ];
    return createBaseResponse(result);
});
