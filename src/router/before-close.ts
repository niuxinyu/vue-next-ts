import { Modal } from 'ant-design-vue';

const beforeClose: {
    beforeCloseNormal: (resolve: Function) => void;
    // eslint-disable-next-line
    [key: string]: any;
} = {
    beforeCloseNormal: (resolve: Function): void => {
        Modal.confirm({
            title: '确定要关闭这一页吗?',
            onOk: () => {
                resolve(true);
            },
            onCancel: () => {
                resolve(false);
            }
        });
    }
};

export default beforeClose;
