"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Cors = require("koa-cors");
const Logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const routes_1 = require("./routes");
const config_1 = require("./config");
const views = require('koa-views');
const restc = require('restc');
const path = require('path');
const koaStatic = require('koa-static');
const validate = require('koa-validate');
const app = new Koa();
const socketInit = require('./socket');
const socket = socketInit();
// 如果是开发者模式
if (process.env.NODE_ENV === 'production') {
    // logger for dev 日志记录
    console.log('logger');
    app.use(Logger());
}
// 始终开启跨域,因为提供在线接口需要跨域
console.log('cors');
app.use(Cors());
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config_1.config.mongo.url, { useMongoClient: true }).catch((err) => {
    console.error('App starting error:', err.stack);
    process.exit(1);
});
app.use(bodyParser());
const staticPath = './';
app.use(koaStatic(path.join(__dirname, staticPath)));
app.use(restc.koa2());
routes_1.Router(app);
validate(app);
const port = config_1.config.app.port;
// 利用中间件去开启socket服务
const server = socket.createServer(app);
console.log('server start:');
console.log('服务正在监听端口:' + port);
server.listen(port, () => {
    console.log(('  App is running at http://localhost:%d in %s mode'), port, process.env.NODE_ENV);
    console.log('  Press CTRL-C to stop\n');
});
// // 开启https
// const options: any = {
//   key: fs.readFileSync('/etc/letsencrypt/live/news.haoqiao.me/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/news.haoqiao.me/fullchain.pem')
// };
// try {
//   const httpsServer = https.createServer(options, app.callback());
//   httpsServer
//     .listen( config.app.httpsPort, function(err: any) {
//       if (!!err) {
//         console.error('HTTPS server FAIL: ', err, (err && err.stack));
//       }
//       else {
//         console.log(('  App is running at https://localhost:%d in %s mode'), config.app.httpsPort, process.env.NODE_ENV);
//       }
//     });
// }
// catch (ex) {
//   console.error('Failed to start HTTPS server\n', ex, (ex && ex.stack));
// } 
//# sourceMappingURL=app.js.map