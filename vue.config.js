const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    configureWebpack: config => {
        if (isProduction) {
            // config.plugins.push(new CompressionWebpackPlugin({
            //     algorithm: 'gzip',
            //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            //     threshold: 10240,
            //     minRatio: 0.8,
            //     deleteOriginalAssets:true
            // }))

            // config.externals = {
            //     'vue': 'Vue',
            //     'vue-router': 'VueRouter',
            //     'element-ui': 'ELEMENT',
            //     'axios': 'axios',
            //     'vuex': 'Vuex'
            // }
        }
        // config.outputDir = {
        //     filename: 'js/[name]_[hash].js'
        // }
    },

    devServer: {
		port: 8081, // 端口
		open: true,
		proxy: 'https://api.iminling.com/v1'
	},
    productionSourceMap: false,

    lintOnSave: false   // 取消 eslint 验证
};