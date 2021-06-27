<script lang="tsx">
import { defineComponent, toRefs, ref, watch, reactive } from 'vue';
import { Menu } from 'ant-design-vue';
import Icon from '@ant-design/icons-vue';
import './MenuItem.less';
import { useI18n } from 'vue-i18n';
import { useRoute } from "vue-router";
import type { Ref, PropType } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { MenuState } from "@/layouts/Main/types";
import { useOpenKeys } from "@/hooks/app";

export default defineComponent({
  components: {
    Menu,
    Icon
  },
  emits: ['menu-click'],
  props: {
    MenuList: {
      type: Array as PropType<RouteRecordRaw[]>,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const { MenuList } = toRefs(props);
    const i18n = useI18n();

    function getMenuName (menu: any) {
      return i18n.t(menu.name);
    }

    const menuState = reactive<MenuState>({
      openKeys: [],
      selectedKeys: []
    });

    const {
      setOpenKeys,
      getOpenKeys
    } = useOpenKeys(menuState);

    const menuActiveList: Ref<Array<string>> = ref(['']);

    function handleMenuClick (params: object) {
      emit('menu-click', params);
    }

    function handleMenuChange (params: string[]) {
      const res = params.find((name: string) => menuState.openKeys.indexOf(name) === -1);
      setOpenKeys(res as string);
    }

    const route = useRoute();

    setOpenKeys(route.matched[0].name as string);

    menuActiveList.value.push(route.name as string);

    watch(() => route.name, () => {
      if (route.path === '/login') return;
      setOpenKeys(route.matched[0].name as string);
      menuActiveList.value = [route.matched[1].name as string];
    });

    function getMenuNode (menuList: object) {
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
                    {getMenuName(menu)}
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
                                {getMenuName(menu)}
                            </span>
              </Menu.Item>
          );
        }
      };
      return inner(menuList);
    }

    return () => {
      return (
          <Menu
              theme="dark"
              mode={'inline'}
              v-models={[
                [menuActiveList.value, 'selectedKeys'],
              ]}
              openKeys={getOpenKeys.value}
              onClick={handleMenuClick}
              onOpenChange={handleMenuChange}
          >
            {
              MenuList.value.length ?
                  MenuList.value.map((item: any): any => {
                    return getMenuNode(item);
                  })
                  : null
            }
          </Menu>
      );
    };
  }
});
</script>
