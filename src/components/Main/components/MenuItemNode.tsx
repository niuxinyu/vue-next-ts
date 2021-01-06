import { defineComponent, reactive, SetupContext, watchEffect  } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { getMenuName } from '@/libs/tools';
import config from '@/config';
import { Menu } from 'ant-design-vue';
import Icon from '@ant-design/icons-vue';
import './MenuItem.less';

const MenuItemNode = defineComponent({
    components: {
        Menu,
        Icon
    },
    props: {
        MenuList: Array
    },
    setup (props, context: SetupContext) {
        const data = reactive({
            menuActiveList: [''],
            menuOpenList: [''],
            component: ''
        });
        const router = useRoute();
        const i18n = useI18n();

        const getMenuNode = (menuList: Record<string, any>) => {
            const inner = (menu: any) => {
                if (menu.children && menu.children.length) {
                    const slots = {
                        title: () => {
                            return (
                                <span class={'menu-icon'}
                                      style={'overflow:hidden;white-space:normal;text-overflow:clip;'}>
                                    {
                                       menu.meta && menu.meta.icon && <menu.meta.icon/>
                                    }
                                    {getMenuName(menu, i18n)}
                                </span>
                            );
                        }
                    };
                    return (
                        <Menu.SubMenu
                            key={menu.name}
                            v-slots={slots}
                        >
                            {
                                menu.children.map((innerItem: any) => inner(innerItem))
                            }
                        </Menu.SubMenu>
                    );
                }
                else {
                    if (menu.meta && menu.meta.hideInMenu) return;
                    return (
                        <Menu.Item key={menu.name}>
                            <span style={'overflow:hidden;white-space:normal;text-overflow:clip;'}>
                                {getMenuName(menu, i18n)}
                            </span>
                        </Menu.Item>
                    );
                }
            };
            return inner(menuList);
        };

        const handleMenuClick = (params: any) => {
            context.emit('menu-click', params);
        };

        const handleUpdateOpenKeys = (params: any) => {
            console.log(params);
        };

        data.menuActiveList = router.name ? [(router.name) as string] : [config.homeName];

        watchEffect(() => {
            data.menuActiveList = [(router.name) as string];
        });

        return () => {
            const menuList = props?.MenuList;
            return (
                <Menu
                    theme={'dark'}
                    mode={'inline'}
                    v-model={[data.menuActiveList, 'selectedKeys']}
                    onClick={handleMenuClick}
                >
                    {
                        menuList && menuList.length ?
                            menuList.map((item: any) => {
                                return getMenuNode(item);
                            })
                            : null
                    }
                </Menu>
            );
        };
    }
});

export default MenuItemNode;
