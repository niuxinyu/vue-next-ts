/**
 * 接口
 * start 开始
 * done 结束 必须调用
 * set 手动设置开始值 0~1
 * increments 手动增加值
 * **/


interface NObject {
    [key: string]: any;
}

const BAR_RUNNING = 'nprogress-busy';

/**
 * utils
 * **/
class Utils {
    static findMinimum (n: number, min: number, max: number) {
        if (n < min) return min;
        if (n > max) return max;
        return n;
    }

    /**
     * 当前进度的百分比
     * **/
    static toBarPercent (n: number): number {
        return (-1 + n) * 100;
    }

    static isStarted (status: any): boolean {
        return typeof status === 'number';
    }

    static isRendered (): boolean {
        return !!document.getElementById('nprogress');
    }

    static addClass (element: HTMLElement, className: string): void {
        // 传入的节点可能之前就存在了要添加的类名
        // 可以通过 toggle 直接实现 做了兼容性实现
        const oldClassList = Utils.classList(element),
            newClassList = oldClassList + name;
        if (this.hasClass(oldClassList, className)) return;
        element.className = newClassList.substring(1);
    }

    static removeClass (element: HTMLElement, className: string): void {
        let newClassList = '';
        const oldClassList = this.classList(element);
        if (!this.hasClass(element, className)) return;
        newClassList = oldClassList.replace(' ' + className + ' ', ' ');
        element.className = newClassList.substring(1, newClassList.length - 1);
    }

    // 移除指定的dom片段
    static removeElement (element: HTMLElement) {
        element && element.parentNode && element.parentNode.removeChild(element);
    }

    static classList (el: HTMLElement): string {
        return (' ' + (el.className || '') + ' ').replace(/\s+/gi, ' ');
    }

    static hasClass (oldClassList: string | HTMLElement, name: string): boolean {
        const list = typeof oldClassList === 'string' ? oldClassList : this.classList(oldClassList);
        return list.indexOf(' ' + name + ' ') >= 0;
    }

    static getPositioningCSS (): string {
        const emptyStyle = document.createElement("div").style;
        const vendorPrefix = ('WebkitTransform' in emptyStyle) ? 'Webkit' :
            ('MozTransform' in emptyStyle) ? 'Moz' :
                ('msTransform' in emptyStyle) ? 'ms' :
                    ('OTransform' in emptyStyle) ? 'O' : '';
        if (vendorPrefix + 'Perspective' in emptyStyle) {
            // Modern browsers with 3D support, e.g. Webkit, IE10
            return 'translate3d';
        }
        else if (vendorPrefix + 'Transform' in emptyStyle) {
            // Browsers without 3D support, e.g. IE9
            return 'translate';
        }
        else {
            // Browsers without translate() support, e.g. IE7-8
            return 'margin';
        }
    }

    static barPositionCSS (n: number, speed: number, ease: string, positionUsing: string): object {
        let barCss: NObject;
        if (positionUsing === 'translate3d') {
            barCss = { transform: 'translate3d(' + this.toBarPercent(n) + '%, 0, 0)' };
        }
        else if (positionUsing === 'translate') {
            barCss = { transform: 'translate(' + this.toBarPercent(n) + '%, 0)' };
        }
        else {
            barCss = { 'margin-left': this.toBarPercent(n) + '%' };
        }

        barCss.transition = 'all ' + speed + 'ms ' + ease;
        return barCss;
    }

    /**
     * css(element, { height: '12px' }) or
     * css(element, height, '12px')
     * **/
    static css = (
        function () {
            const cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
                cssProps: NObject = {};

            function getVendorProp (prop: string): string {
                // create empty style
                //https://github.com/jquery/jquery/blob/6984d1747623dbc5e87fd6c261a5b6b1628c107c/src/css/finalPropName.js#L4
                // 如果在当前浏览器支持的style内 直接返回；如果不是当前浏览器内的style属性 则需要做差异化处理；
                const emptyStyle = document.createElement("div").style;
                if (prop in emptyStyle) return prop;

                // 差异化处理
                // 如果在不是标准的css样式 需要加上前缀
                let i = cssPrefixes.length,
                    vendorName;
                const capName = prop.charAt(0).toUpperCase() + prop.slice(1);
                while (i--) {
                    vendorName = cssPrefixes[i] + capName;
                    if (vendorName in emptyStyle) return vendorName;
                }
                return prop;
            }

            function camelCase (string: string) {
                // 将带有前缀的css属性 通通格式化为大写
                return string.replace(/^-ms-/, 'ms-').replace(/-([a-z])/gi, function (match: string, letter: string) {
                    return letter.toUpperCase();
                });
            }

            function getStyleProp (prop: string): string {
                prop = camelCase(prop);
                return cssProps[prop] || (cssProps[prop] = getVendorProp(prop));
            }

            function applyCss (element: HTMLElement, prop: string, value: string) {
                prop = getStyleProp(prop);
                (element.style as any)[prop] = value;
            }

            return function (element: HTMLElement, properties: NObject) {
                // eslint-disable-next-line prefer-rest-params
                const args = arguments;
                let prop,
                    value;
                if (args.length === 2) {
                    for (prop in properties) {
                        if (Object.prototype.hasOwnProperty.call(properties, prop)) {
                            value = properties[prop];
                            // 必须保证 prop 不是对象内的属性 不能是继承自原型链的属性
                            // 直接使用 properties 的 hasOwnProperty 方法在极端情况下会报错
                            // https://juejin.cn/post/6844903881437085709
                            if (value !== undefined) applyCss(element, prop, value);
                        }
                    }
                }
                else {
                    applyCss(element, args[1], args[2]);
                }
            };
        }
    )();

    /**
     * 队列 依次执行函数
     * **/
    static queue = (
        function () {
            const pending: Function[] = [];

            function next (): void {
                const fn = pending.shift();
                if (fn) {
                    fn(next);
                }
            }

            return function (fn: Function): void {
                pending.push(fn);
                if (pending.length === 1) next();
            };
        }
    )();
}


class NProgress {
    public Settings: any = {
        minimum: 0.08, // 开始进度条的最小值
        parent: 'body', // 挂载到哪里
        speed: 200,
        easing: 'ease',
        trickle: true,
        trickleRate: 0.02,
        trickleSpeed: 800, // 增量速度 每多少毫秒增加一次
        positionUsing: '', // 兼容化处理 应用何种偏移方式
        showSpinner: true, // 是否显示加载中
        barSelector: '[role=bar]',
        spinnerSelector: '[role=spinner]',
        template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
    }

    public configure (options: NObject): NProgress {
        let key: string;
        let value: any;
        for (key in options) {
            if (Object.prototype.hasOwnProperty.call(options, key)) {
                value = options[key];
                if (value !== undefined) this.Settings[key] = value;
            }
        }
        return this;
    }

    public status: any; // 当前是否开始进度条 开始的化 此值为当前进度；否则为null

    public render (isStarted: boolean): HTMLElement {
        if (Utils.isRendered()) return (document.getElementById('nprogress') as HTMLElement);

        Utils.addClass(document.documentElement, BAR_RUNNING);

        const nprogress = document.createElement('div');
        nprogress.id = 'nprogress';
        nprogress.innerHTML = this.Settings.template;

        const parent = document.querySelector(this.Settings.parent) as HTMLElement,
            bar = nprogress.querySelector(this.Settings.barSelector) as HTMLElement,
            percent = isStarted ? '-100' : Utils.toBarPercent(this.status || 0);
        let spinner: HTMLElement;

        Utils.css(bar, {
            transition: 'all 0 liner',
            transform: 'translate3d(' + percent + '%, 0, 0)'
        });

        if (!this.Settings.showSpinner) {
            spinner = nprogress.querySelector(this.Settings.spinnerSelector);
            spinner && Utils.removeElement(spinner);
        }

        if (parent !== document.body) {
            Utils.addClass(parent, 'nprogress-custom-paren');
        }

        parent.appendChild(nprogress);

        return nprogress;
    }

    public remove () {
        // 移除dom片段以及类名
        Utils.removeClass(document.documentElement, BAR_RUNNING);
        const nprogress = document.getElementById('nprogress');
        nprogress && Utils.removeElement(nprogress);
    }

    /**
     * n 0.0 - 1.0
     * **/
    public set (n: number) {
        const started = Utils.isStarted(this.status);
        n = Utils.findMinimum(n, this.Settings.minimum, 1);
        this.status = (n === 1 ? null : n);
        const nprogress = this.render(!started),
            bar = nprogress.querySelector(this.Settings.barSelector) as HTMLElement,
            speed = this.Settings.speed,
            ease = this.Settings.easing;
        Utils.queue((next: Function) => {
            if (this.Settings.positionUsing === '') this.Settings.positionUsing = Utils.getPositioningCSS();
            // 增加动画
            Utils.css(bar, Utils.barPositionCSS(n, speed, ease, this.Settings.positionUsing));

            if (n === 1) {
                // 动画结束
                Utils.css(
                    nprogress, {
                        transition: 'none',
                        opacity: 1
                    }
                );
                setTimeout(() => {
                    Utils.css(
                        nprogress, {
                            transition: 'all ' + speed + 'ms linear',
                            opacity: 0
                        }
                    );
                    setTimeout(() => {
                        this.remove();
                        next();
                    }, speed);
                }, speed);
            }
            else {
                // 正常动画流程
                setTimeout(next, speed);
            }
        });

        return this;
    }

    public start () {
        if (!this.status) this.set(0);

        const work = () => {
            setTimeout(() => {
                if (!this.status) return;
                this.trickle();
                work();
            }, this.Settings.trickleSpeed);
        };

        if (this.Settings.trickle) work();

        return this;
    }

    public done (params?: boolean) {
        if (!params && !this.status) return this;
        return this.increments(0.3 + 0.5 * Math.random()).set(1);
    }

    public trickle (): any {
        return this.increments(Math.random() * this.Settings.trickleRate);
    }

    // 根据当前进度随机增量
    public increments (amount?: number): NProgress {
        let n = this.status;
        if (!n) {
            return this.start();
        }
        else {
            if (typeof amount !== 'number') {
                amount = (1 - n) * Utils.findMinimum(Math.random() * n, 0.1, 0.95);
            }

            n = Utils.findMinimum(n + amount, 0, 0.994);
            return this.set(n);
        }
    }

    public isStarted (): boolean {
        return Utils.isStarted(this.status);
    }
}


export default NProgress;
