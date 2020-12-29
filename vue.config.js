const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:5000/api',
    //             ws: true,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': ''
    //             },
    //         },
    //     }
    // },
    publicPath:"./",
    chainWebpack: config => {
        config.resolve.alias
        .set('@', resolve('src'))
    }
}