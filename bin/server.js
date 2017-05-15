const fs = require('fs');       // 文件模块
const path = require('path');   // 系统路劲模块
const express = require('express');
const serveIndex = require('serve-index');
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const _ = require('lodash');
const env = require('../env');

const app = express();
const html = fs.readFileSync(path.resolve(__dirname, 'index.html'));
const {host, port} = env.devServer;

// local static serve
app.use(serveStatic('static'));

// express middleware
app.use(favicon(path.join(__dirname, '..', 'static', 'avator.jpg')));

// // ==> Proxy
// const httpProxy = require('http-proxy');
//
// const proxy = httpProxy.createProxyServer({
//   target: env.proxy.url,
//   ws: true
// });
//
// proxy.on('error', (error, req, res) => {
//   let json;
//   if (error.code !== 'ECONNRESET') {
//     console.log('proxy error', error);
//   }
//
//   if (!res.headersSent) {
//     res.writeHead(500, {'content-type': 'application/json'});
//   }
//
//   json = {error: 'proxy_error', reason: error.message};
//   res.end(JSON.stringify(json));
// });
//
// ['/api', '/users', '/images'].forEach((_path) => {
//   app.use(_path, (req, res) => {
//     proxy.web(req, res, {
//       target: env.proxy.url + (_path === '/api' ? '' : _path),
//       headers: {
//         'Host': env.proxy.host,
//         'Cookie': env.proxy.cookie
//       }
//     });
//   });
// });
//
// // <== Proxy

app.use('/', serveIndex('src', {
  'icons': true,
  'template': (locals, callback) => {
    callback(null, _.template(html)({
      scripts: [
        `http://${host}:${port + 1}/vendor.js`,
        `http://${host}:${port + 1}/app.js`
      ].map((script) => `<script src="${script}"></script>`)
        .join('\n')
    }));
  }
}));

app.listen(port, host, function listen(err) {
  if (err) {
    console.error(err);
  }
  console.info('==>  Server listening on http://%s:%s', host, port);
});
