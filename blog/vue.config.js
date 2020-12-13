const path = require('path');

const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    publicPath: '/',
    outputDir: path.resolve(__dirname, '../service/public'),
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost',
                changeOrigin: true
            }
        }
    },
    configureWebpack: {
        // productionGzip: true,
        plugins: [
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.html$|\.css/, // 匹配的文件名
                threshold: 10240, // 文件超过10k，进行gzip压缩
                minRatio: 0.8,
                deleteOriginalAssets: false // 是否删除原文件
            })
        ]
    }
}