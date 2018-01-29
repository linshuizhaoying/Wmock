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
const Service = require("../service");
const path = require('path');
const middleware = require('../middleware/index');
const router = new Irouter();
exports.Router = (app) => {
    const { reg, login, tokenLogin, userInfo, messagesList, userProjectList, demoProjectList, documentList, uploadFile, teamList, mock, unJoinProjectList, baseModelList, customModelList } = Service;
    router.post('/api/reg', Service.reg)
        .post('/api/login', Service.login)
        .get('/api/userInfo', Service.userInfo)
        .post('/api/token', Service.tokenLogin)
        .get('/api/messagesList', Service.messagesList)
        .post('/api/demoList', Service.demoProjectList)
        .post('/api/projectList', Service.userProjectList)
        .post('/api/unJoinProjectList', Service.unJoinProjectList)
        .post('/api/teamList', Service.teamList)
        .post('/api/documentList', Service.documentList)
        .get('/api/baseModelList', Service.baseModelList)
        .post('/api/customModelList', Service.customModelList)
        .post('/api/upload', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let result = {};
        const serverFilePath = path.join(__dirname, '../images');
        // 上传文件事件
        result = yield uploadFile(ctx, {
            fileType: 'up',
            path: serverFilePath
        });
        console.log(result);
        ctx.body = result;
    }));
    // 根据对应请求返回 mock数据
    router.use('/mock', middleware.mockFilter, Service.mock);
    router.all('/*', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        ctx.body = {
            'state': {
                'code': 404,
                'msg': 'error'
            },
            'data': undefined
        };
    }));
    app.use(router.routes());
};
exports.default = exports.Router;
//# sourceMappingURL=index.js.map