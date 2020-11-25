import { autoImport } from "@/libs/utils";

const res = autoImport(require.context('../components/custom', true, /.ts$/));

export const InstallCustomCom = (vm: any) => {
    res.map((com: any) => {
        vm.component(com.name, com);
    });
};

