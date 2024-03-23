const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: `https://khanh123.bsite.net`,
            changeOrigin: true,
        }),
    );
};
