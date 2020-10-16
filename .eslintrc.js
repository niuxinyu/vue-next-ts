module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    // parser: "@typescript-eslint/parser"
    // 这是原来的配置 但是在vue文件内会报错
    // 所以将配置替换为 vue-eslint-parser，并且将 @typescript-eslint/parser 放到 parserOptions 配置内
    plugins: ['@typescript-eslint'],
    rules: {
        'object-curly-spacing': [2, 'always'],
        'space-before-blocks': 2,
        'no-irregular-whitespace': 2, //不规则的空白不允许
        'no-trailing-spaces': 2, //一行结束后面有空格就发出警告
        'semi': [2, 'always'],//语句强制分号结尾
        'space-before-function-paren': 2,
        // 允许在ts内使用var和require
        '@typescript-eslint/no-var-requires': 0,
    },
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        'parser': '@typescript-eslint/parser',
        'ecmaVersion': 2020
    }
};
