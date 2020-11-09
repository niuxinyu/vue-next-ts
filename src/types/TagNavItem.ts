interface TagNavItem {
    readonly name: string;
    readonly meta: { title: string; icon?: Function };
    readonly query: object;
    readonly params: object;
}

export {
    TagNavItem
};
