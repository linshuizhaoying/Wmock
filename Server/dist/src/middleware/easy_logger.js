/**
 * @Author: linshuizhaoying
 * @Date:   2018-04-27  14:33:00
 * @Last modified by:   linshuizhaoying
 * @Last modified time: 2018-04-27  14:33:00
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.middleware = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    ctx.koaLogger = {};
    ctx.koaLogger.log = (content) => ctx.logger.log(JSON.stringify(content));
    ctx.koaLogger.info = (content) => ctx.logger.info(JSON.stringify(content));
    ctx.koaLogger.warn = (content) => ctx.logger.warn(JSON.stringify(content));
    ctx.koaLogger.error = (content) => ctx.logger.error(JSON.stringify(content));
    yield next();
});
exports.easyLogger = () => __awaiter(this, void 0, void 0, function* () {
    global.koaLogger = {};
    global.koaLogger.log = (content) => global.logger.log(JSON.stringify(content));
    global.koaLogger.info = (content) => global.logger.info(JSON.stringify(content));
    global.koaLogger.warn = (content) => global.logger.warn(JSON.stringify(content));
    global.koaLogger.error = (content) => global.logger.error(JSON.stringify(content));
});
//# sourceMappingURL=easy_logger.js.map