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
        'semi': [2, 'always'], //语句强制分号结尾
        'space-before-function-paren': 2, //
        'eol-last': 'error', // 要求文件末尾保留一行空行
        // 'brace-style': ['error', 'stroustrup'], // if else 等语句的换行规则 报错 必须换行,
        'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }], // 避免自闭和标签单独写闭合标签时报错
        'camelcase': 0,
        // 允许在ts内使用var和require
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        '@typescript-eslint/camelcase': 0,
        // 允许使用any
        '@typescript-eslint/no-explicit-any': 0
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
