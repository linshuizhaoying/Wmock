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
const index_1 = require("../db/controllers/index");
const dataHandle_1 = require("../utils/dataHandle");
exports.userProjectList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    console.log(userId);
    const { userName } = ctx.request.body;
    const result = yield index_1.UserProject(userId);
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.demoProjectList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    console.log(userId);
    const { userName } = ctx.request.body;
    const result = yield index_1.DemoProject(userId);
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.unJoinProjectList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    console.log(userId);
    const result = yield index_1.UnJoinProjectList(userId);
    // console.log(result)
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.addProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const project = ctx.request.body;
    console.log(project);
    return ctx.body = dataHandle_1.success({}, '添加成功!');
});
exports.updateProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const project = ctx.request.body;
    console.log(project);
    return ctx.body = dataHandle_1.success({}, '更新成功!');
});
exports.removeProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const project = ctx.request.body;
    console.log(project);
    return ctx.body = dataHandle_1.success({}, '删除成功!');
});
exports.importProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { data } = ctx.request.body;
    console.log(data);
    return ctx.body = dataHandle_1.success({}, '导入成功!');
});
exports.cloneProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { data } = ctx.request.body;
    console.log(data);
    return ctx.body = dataHandle_1.success({}, '克隆成功!');
});
exports.cloneInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { data } = ctx.request.body;
    console.log(data);
    return ctx.body = dataHandle_1.success({}, '克隆成功!');
});
exports.verifyProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { data } = ctx.request.body;
    console.log(data);
    return ctx.body = dataHandle_1.success({
        result: 'no',
        data: [
            {
                'interfaceName': 'token',
                'expect': '{data:2333}',
                'actual': '{xxx:222}',
                'compare': 'mismatch'
            }, {
                'interfaceName': '注册',
                'expect': '{data:2333}',
                'actual': '{data:222}',
                'compare': 'match'
            }, {
                'interfaceName': '登录',
                'expect': '{ccc:2333}',
                'actual': '{ccc:123asd123}',
                'compare': 'match'
            }
        ]
    }, '验证成功');
});
exports.addInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const interfaceData = ctx.request.body;
    console.log(interfaceData);
    return ctx.body = dataHandle_1.success({}, '添加成功!');
});
exports.updateInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const interfaceData = ctx.request.body;
    console.log(interfaceData);
    return ctx.body = dataHandle_1.success({}, '更新成功!');
});
exports.removeInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const interfaceData = ctx.request.body;
    console.log(interfaceData);
    return ctx.body = dataHandle_1.success({}, '删除成功!');
});
//# sourceMappingURL=project.js.map