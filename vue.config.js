const path = require('path');

module.exports = {
    // pluginOptions: {
    //   'style-resources-loader': {
    //     preProcessor: 'less',
    //     patterns: [path.resolve(__dirname, './src/theme/index.less')]
    //   }
    // }
    css: {
        loaderOptions: {
            less: {
                // 解决 https://github.com/ant-design/ant-motion/issues/44 less报错的问题
                javascriptEnabled: true
            }
        }
    },

    pluginOptions: {
      'style-resources-loader': {
        preProcessor: 'less',
        patterns: [path.resolve(__dirname, './src/theme/index.less')]
      }
    }
};
