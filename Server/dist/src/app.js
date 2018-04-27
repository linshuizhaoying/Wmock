"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cors = require("koa-cors");
const Koa = require("koa");
const routes_1 = require("./routes");
const config_1 = require("./config");
const views = require("koa-views");
const restc = require("restc");
const path = require("path");
const koaStatic = require("koa-static");
const validate = require("koa-validate");
const convert = require("koa-convert");
const app = new Koa();
const middlewares = require('koa-middlewares');
const bodyparser = require('koa-bodyparser')();
const socketInit = require("./socket");
const socket = socketInit();
// 日志记录
const logRecord = require("koa-logs-full");
const logger = require("koa-logger");
const easyLogger = require("./middleware/easy_logger");
/**
 * response time header
 */
app.use(convert(middlewares.rt()));
app.use(convert(bodyparser));
app.use(convert(logger()));
/**
 * 日志记录中间件，可以将统一请求的日志集中到一起
 * 日志可以有 log, info, warn, error 四种类型
 * 暴露出一个全局的 koaLogger，用法：koaLogger.log('Hello logger');
 * 在请求中可以调用 this.koaLogger 来记录该请求中的日志
 */
app.use(convert(logRecord(app, {
    logdir: path.join(__dirname, "logs"),
    exportGlobalLogger: true
})));
app.use(easyLogger.middleware);
easyLogger.easyLogger();
const koaLogger = global.koaLogger;
// 始终开启跨域,因为提供在线接口需要跨域
console.log("cors");
app.use(Cors());
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
    .connect(config_1.config.mongo.url, { useMongoClient: true })
    .catch((err) => {
    // if error we will be here
    koaLogger.info("mongodb error", err);
    console.error("App starting error:", err.stack);
    process.exit(1);
});
const staticPath = "./";
app.use(koaStatic(path.join(__dirname, staticPath)));
app.use(restc.koa2());
routes_1.Router(app);
validate(app);
const port = config_1.config.app.port;
// 利用中间件去开启socket服务
const server = socket.createServer(app);
console.log("server start:");
console.log("服务正在监听端口:" + port);
server.listen(port, () => {
    koaLogger.info(`App is running at http://localhost:${port} in ${process.env.NODE_ENV} mode`);
    console.log("  App is running at http://localhost:%d in %s mode", port, process.env.NODE_ENV);
    console.log("  Press CTRL-C to stop\n");
});
server.on("error", function (err, ctx) {
    console.log(err);
    koaLogger.info("server error", err, ctx);
});
//# sourceMappingURL=app.js.map