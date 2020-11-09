import { Menu } from 'ant-design-vue';
import Icon from '@ant-design/icons-vue';
import './MenuItem.less';
import { defineComponent } from 'vue';
import { getMenuName } from '@/libs/tools';
import config from '@/config';

interface CustomData {
    menuActiveList: string[];
    menuOpenList: string[];
}

const MenuItemNode = defineComponent({
    components: {
        Menu,
        Icon
    },
    props: {
        MenuList: Array
    },
    data (): CustomData {
        return {
            menuActiveList: [],
            menuOpenList: ['home']
        };
    },
    methods: {
        getMenuNode (menuList: object) {
            const inner = (menu: any) => {
                if (menu.children && menu.children.length) {
                    const slots = {
                        title: () => {
                            return (
                                <span class={'menu-icon'}
                                      style={'overflow:hidden;white-space:normal;text-overflow:clip;'}>
                                    {
                                        menu.meta.icon && <menu.meta.icon/>
                                    }
                                    {getMenuName(menu, this)}
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
                    return (
                        <Menu.Item key={menu.name}>
                            <span style={'overflow:hidden;white-space:normal;text-overflow:clip;'}>
                                {getMenuName(menu, this)}
                            </span>
                        </Menu.Item>
                    );
                }
            };
            return inner(menuList);
        },
        handleMenuClick (params: object): void {
            this.$emit('menu-click', params);
        }
    },
    created () {
        const name: string = this.$route.name as string;
        this.menuActiveList = name ? [name] : [config.homeName];
    },
    render () {
        const { MenuList = [] } = this;
        // jsx https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
        return (
            <Menu
                theme='dark'
                mode={'inline'}
                v-model={[[this.menuActiveList, this.menuOpenList], ['selectedKeys', 'openKeys']]}
                onClick={this.handleMenuClick}
            >
                {
                    MenuList.length ?
                        MenuList.map((item: any): any => {
                            return this.getMenuNode(item);
                        })
                        : null
                }
            </Menu>
        );
    }
});

export default MenuItemNode;
