import Mock from "mockjs";
import { createBaseResponse } from "@/mock/utils";

Mock.mock('/menuList', 'post', (res: any, req: any) => {
    const result = {} as Record<string, any>;
    result.menuList = [
        {
            id: 1,
            title: '首页',
            name: 'home',
            icon: '',
            path: '',
            children: [
                {
                    id: '1-1',
                    title: '首页',
                    name: 'home',
                    icon: '',
                    children: []
                }
            ]
        },
        {
            id: 2,
            title: '用户',
            name: 'user',
            icon: '',
            path: '',
            children: [
                {
                    id: '2-1',
                    title: '用户',
                    name: 'user',
                    icon: '',
                    children: []
                }
            ]
        }
    ];
    return createBaseResponse(result);
});
