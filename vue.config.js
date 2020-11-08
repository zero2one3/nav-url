

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000/api',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            },
        }
    }
}