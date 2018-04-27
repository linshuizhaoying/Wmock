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
const _ = require('lodash');
const field = require('../db/models/field');
exports.addInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const interfaceItem = ctx.request.body;
    const projectId = ctx.checkBody('projectId').notEmpty().len(1, 32).value;
    const interfaceName = ctx.checkBody('interfaceName').notEmpty().len(1, 32).value;
    const url = ctx.checkBody('url').notEmpty().len(1, 32).value;
    const method = ctx.checkBody('method').notEmpty().len(1, 32).value;
    const desc = ctx.checkBody('desc').notEmpty().value;
    const mode = ctx.checkBody('mode').notEmpty().value;
    if (ctx.errors) {
        return ctx.body = dataHandle_1.error('用户数据不正常,添加失败!');
    }
    const exist = yield index_1.CheckInterfaceExist(projectId, url, method);
    // console.log(exist)
    if (exist) {
        return ctx.body = dataHandle_1.error('接口已经存在!');
    }
    else {
        const result = yield index_1.AddInterface(interfaceItem);
        // 添加对应接口增加消息
        const project = yield index_1.FindProjectById(projectId);
        const { userId } = ctx.tokenContent;
        const userData = yield index_1.FindUserById(userId);
        const addInterfaceMessage = {
            operatorId: userId,
            operatorName: userData.userName,
            action: 'add',
            projectId: projectId,
            objectId: result,
            objectName: interfaceName,
            desc: '用户 ' + userData.userName + ' 增加了接口 ' + interfaceName,
            userId: userId,
            avatar: userData.avatar,
            type: 'normal'
        };
        yield index_1.AddMessage(addInterfaceMessage);
        return ctx.body = dataHandle_1.success({ interfaceId: result }, '添加成功!');
    }
});
exports.updateInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const interfaceItem = ctx.request.body;
    const _id = ctx.checkBody('_id').notEmpty().value;
    const url = ctx.checkBody('url').notEmpty().value;
    const projectId = ctx.checkBody('projectId').notEmpty().value;
    const mode = ctx.checkBody('mode').notEmpty().value;
    const method = ctx.checkBody('method').notEmpty().value;
    const interfaceName = ctx.checkBody('interfaceName').notEmpty().value;
    const desc = ctx.checkBody('desc').notEmpty().value;
    if (ctx.errors) {
        return ctx.body = dataHandle_1.error('用户数据不正常,更新失败!');
    }
    const result = yield index_1.UpdateInterface(interfaceItem);
    // 添加对应接口更新消息
    const project = yield index_1.FindProjectById(projectId);
    const { userId } = ctx.tokenContent;
    const userData = yield index_1.FindUserById(userId);
    const updateInterfaceMessage = {
        operatorId: userId,
        operatorName: userData.userName,
        action: 'update',
        projectId: projectId,
        objectId: _id,
        objectName: interfaceName,
        desc: '用户 ' + userData.userName + ' 更新了接口 ' + interfaceName,
        userId: userId,
        avatar: userData.avatar,
        type: 'normal'
    };
    yield index_1.AddMessage(updateInterfaceMessage);
    return ctx.body = dataHandle_1.success({}, '更新成功!');
});
exports.removeInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { interfaceId } = ctx.request.body;
    const id = ctx.checkBody('interfaceId').notEmpty().value;
    if (ctx.errors) {
        return ctx.body = dataHandle_1.error('用户数据不正常,删除失败!');
    }
    // 添加对应接口删除消息
    const interfaceData = yield index_1.FindInterfaceById(interfaceId);
    const { userId } = ctx.tokenContent;
    const userData = yield index_1.FindUserById(userId);
    const removeInterfaceMessage = {
        operatorId: userId,
        operatorName: userData.userName,
        action: 'remove',
        projectId: interfaceData.projectId,
        objectId: interfaceId,
        objectName: interfaceData.interfaceName,
        desc: '用户 ' + userData.userName + ' 删除了接口 ' + interfaceData.interfaceName,
        userId: userId,
        avatar: userData.avatar,
        type: 'normal'
    };
    yield index_1.AddMessage(removeInterfaceMessage);
    const result = yield index_1.RemoveInterface(interfaceId);
    return ctx.body = dataHandle_1.success({}, '删除成功!');
});
exports.cloneInterface = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { projectId, interfaceId } = ctx.request.body;
    const vaildProjectId = ctx.checkBody('projectId').notEmpty().value;
    const validInterfaceId = ctx.checkBody('interfaceId').notEmpty().value;
    if (ctx.errors) {
        return ctx.body = dataHandle_1.error('用户数据不正常,克隆失败!');
    }
    const oldInterface = yield index_1.FindInterfaceById(interfaceId);
    // 洗下接口数据
    // const cleanInterface = oldInterface.map((item: InterfaceData) => _.pick(item, field.pureInterfaceField))
    // console.log(oldInterface)
    const cleanInterface = _.pick(oldInterface, field.pureInterfaceField);
    cleanInterface.projectId = projectId;
    // console.log(cleanInterface)
    const result = yield index_1.AddInterface(cleanInterface);
    return ctx.body = dataHandle_1.success({}, '克隆成功!');
});
exports.cloneInterfaceItem = (projectId, interfaceId) => __awaiter(this, void 0, void 0, function* () {
    const oldInterface = yield index_1.FindInterfaceListById(interfaceId);
    // 洗下接口数据
    const cleanInterface = oldInterface.map((item) => _.pick(item, field.pureInterfaceField));
    cleanInterface[0].projectId = projectId;
    return yield index_1.AddInterface(cleanInterface[0]);
});
//# sourceMappingURL=interface.js.map