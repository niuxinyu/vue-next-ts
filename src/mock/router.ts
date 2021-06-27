import Mock from "mockjs";
import { createBaseResponse } from "@/mock/utils";

Mock.mock('/menuList', 'post', (res: { body: any }, req: any) => {
    const result = {} as Record<string, any>;
    const body = JSON.parse(res.body);
    if (body.mode === 1) {
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
    }
    else if (body.mode === 2) {
        result.menuList = [
            {
                name: 'home',
                pid: 0,
                icon: '',
                children: [
                    {
                        name: 'home',
                        icon: '',
                        component: 'home',
                        children: []
                    },
                    {
                        name: 'user',
                        icon: '',
                        component: 'user',
                        children: []
                    },
                    {
                        name: 'other',
                        icon: '',
                        component: 'other',
                        children: []
                    }
                ]
            },
            // {
            //     name: 'user',
            //     pid: 0,
            //     icon: '',
            //     children: [
            //         {
            //             name: 'user',
            //             icon: '',
            //             component: 'user',
            //             children: []
            //         }
            //     ]
            // }
        ];
    }
    return createBaseResponse(result);
});
