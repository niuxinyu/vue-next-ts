class NProgress {
    public Settings = {
        minimum: 0.08, // 开始进度条的最小值
        parent: 'body', // 挂载到哪里
        barSelector: '[role=bar]',
        template: '<div role="bar" class="bar"><div class="peg"></div></div>'
    }

    public render () {
        const nprogress = document.createElement('div');
        nprogress.id = 'nprogress';
        nprogress.innerHTML = this.Settings.template;

        const parent = document.querySelector(this.Settings.parent) as Node;
        parent.appendChild(nprogress);
    }

    public set (n: number): void {
        this.render();
    }
}

export default NProgress;
