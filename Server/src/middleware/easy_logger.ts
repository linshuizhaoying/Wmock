/**
 * @Author: linshuizhaoying
 * @Date:   2018-04-27  14:33:00
 * @Last modified by:   linshuizhaoying
 * @Last modified time: 2018-04-27  14:33:00
 */

exports.middleware = async (ctx: any, next: any) => {
  ctx.koaLogger = {};
  ctx.koaLogger.log = (content: any) => ctx.logger.log(JSON.stringify(content));
  ctx.koaLogger.info = (content: any) =>
    ctx.logger.info(JSON.stringify(content));
  ctx.koaLogger.warn = (content: any) =>
    ctx.logger.warn(JSON.stringify(content));
  ctx.koaLogger.error = (content: any) =>
    ctx.logger.error(JSON.stringify(content));
  await next();
};

exports.easyLogger = async () => {
  global.koaLogger = {};
  global.koaLogger.log = (content: any) =>
    global.logger.log(JSON.stringify(content));
  global.koaLogger.info = (content: any) =>
    global.logger.info(JSON.stringify(content));
  global.koaLogger.warn = (content: any) =>
    global.logger.warn(JSON.stringify(content));
  global.koaLogger.error = (content: any) =>
    global.logger.error(JSON.stringify(content));
};
