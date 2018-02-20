"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const config_1 = require("../config");
exports.default = (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const authorization = ctx.get('Authorization');
    if (authorization === '') {
        ctx.throw(401, '在http头中没有检测到Authorization');
    }
    let tokenContent;
    try {
        tokenContent = yield jwt.verify(authorization, config_1.config.app.keys);
    }
    catch (err) {
        if ('TokenExpiredError' === err.name) {
            ctx.throw(401, 'token过期,请及时本地保存数据！');
        }
        ctx.throw(401, '无效的token');
    }
    console.log('鉴权成功');
    console.log(tokenContent);
    ctx.tokenContent = tokenContent;
    yield next();
});
//# sourceMappingURL=token.js.map