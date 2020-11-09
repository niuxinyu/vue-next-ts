import { Menu } from 'ant-design-vue';
import Icon from '@ant-design/icons-vue';
import './MenuItem.less';
import { defineComponent } from 'vue';
import { getMenuName } from '@/libs/tools';

const MenuItemNode = defineComponent({
    components: {
        Menu,
        Icon
    },
    props: {
        MenuList: Array
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
    render () {
        const { MenuList = [] } = this;
        return (
            <Menu theme='dark' mode={'inline'} onClick={this.handleMenuClick}>
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
