const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://khanh123.bsite.net',
            // target: `http://${process.env.REACT_APP_PROXY_API_HOST}:${process.env.REACT_APP_PROXY_API_PORT}`,
            changeOrigin: true,
        }),
    );
};


