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
const Irouter = require("koa-router");
const token_1 = require("../middleware/token");
const Service = require("../service");
const config_1 = require("../config");
// 前缀路由 /api
const router = new Irouter({ prefix: config_1.config.app.baseApi });
exports.Router = (app) => {
    const { reg, login, userInfo, } = Service;
    router.post('/reg', Service.reg)
        .post('/login', Service.login)
        .get('/userInfo', token_1.default, Service.userInfo)
        .get('/token', token_1.default, Service.token);
    router.all('/*', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        ctx.body = '404';
    }));
    app.use(router.routes());
};
exports.default = exports.Router;
//# sourceMappingURL=index.js.map