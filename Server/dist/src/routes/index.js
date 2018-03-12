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
const token_1 = require("../middleware/token");
const path = require('path');
const middleware = require('../middleware/index');
const router = new Irouter();
exports.Router = (app) => {
    const { reg, login, tokenLogin, userInfo, updateUser, messagesList, userProjectList, demoProjectList, allProjectList, documentList, documentMessages, removeDocument, addDocument, updateDocument, uploadFile, teamList, sendApply, allowedJoinGroup, rejectJoinGroup, removeGroupMember, invitedGroupMember, mock, unJoinProjectList, addProject, removeProject, updateProject, importProject, cloneProject, verifyProject, addInterface, removeInterface, updateInterface, cloneInterface, baseModelList, customModelList, addModel, updateModel, removeModel, } = Service;
    router.post('/api/reg', Service.reg)
        .post('/api/login', Service.login)
        .get('/api/userInfo', token_1.default, Service.userInfo)
        .get('/api/token', token_1.default, Service.tokenLogin)
        .post('/api/updateUser', token_1.default, Service.updateUser)
        .get('/api/messagesList', token_1.default, Service.messagesList)
        .get('/api/allProjectList', token_1.default, Service.allProjectList)
        .get('/api/demoList', token_1.default, Service.demoProjectList)
        .get('/api/projectList', token_1.default, Service.userProjectList)
        .get('/api/unJoinProjectList', token_1.default, Service.unJoinProjectList)
        .post('/api/addProject', token_1.default, Service.addProject)
        .post('/api/updateProject', token_1.default, Service.updateProject)
        .post('/api/removeProject', token_1.default, Service.removeProject)
        .post('/api/importProject', token_1.default, Service.importProject)
        .post('/api/cloneProject', token_1.default, Service.cloneProject)
        .post('/api/cloneInterface', token_1.default, Service.cloneInterface)
        .post('/api/verifyProject', token_1.default, Service.verifyProject)
        .post('/api/addInterface', token_1.default, Service.addInterface)
        .post('/api/updateInterface', token_1.default, Service.updateInterface)
        .post('/api/removeInterface', token_1.default, Service.removeInterface)
        .get('/api/teamList', token_1.default, Service.teamList)
        .post('/api/sendApply', token_1.default, Service.sendApply)
        .post('/api/allowedJoinGroup', token_1.default, Service.allowedJoinGroup)
        .post('/api/rejectJoinGroup', token_1.default, Service.rejectJoinGroup)
        .post('/api/removeGroupMember', token_1.default, Service.removeGroupMember)
        .post('/api/invitedGroupMember', token_1.default, Service.invitedGroupMember)
        .get('/api/documentList', token_1.default, Service.documentList)
        .post('/api/documentMessages', token_1.default, Service.documentMessages)
        .post('/api/addDocument', token_1.default, Service.addDocument)
        .post('/api/updateDocument', token_1.default, Service.updateDocument)
        .post('/api/removeDocument', token_1.default, Service.removeDocument)
        .get('/api/baseModelList', token_1.default, Service.baseModelList)
        .get('/api/customModelList', token_1.default, Service.customModelList)
        .post('/api/addModel', token_1.default, Service.addModel)
        .post('/api/updateModel', token_1.default, Service.updateModel)
        .post('/api/removeModel', token_1.default, Service.removeModel)
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