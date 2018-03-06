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
exports.teamList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    let result = yield index_1.TeamList(userId);
    // 过滤下敏感信息
    result = result.map((item) => {
        // 先过滤一遍Team,不然会影响member的过滤
        item = _.pick(item, field.teamField);
        const temp = item.member.map((o) => _.pick(o, field.memberField));
        item.member = temp;
        return item;
    });
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.sendApply = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const apply = ctx.request.body;
    console.log(apply);
    // 对每个属性做不为空的校验
    const operatorId = ctx.checkBody('operatorId').notEmpty().value;
    const operatorName = ctx.checkBody('operatorName').notEmpty().value;
    const projectId = ctx.checkBody('projectId').notEmpty().value;
    const action = ctx.checkBody('action').notEmpty().value;
    const objectId = ctx.checkBody('objectId').notEmpty().value;
    const objectName = ctx.checkBody('objectName').notEmpty().value;
    const desc = ctx.checkBody('desc').notEmpty().value;
    const type = ctx.checkBody('type').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,申请失败!');
    }
    const userData = yield index_1.FindUserById(operatorId);
    // 添加对应项目消息
    const applyMessage = {
        operatorId: operatorId,
        operatorName: operatorName,
        action: action,
        projectId: projectId,
        objectId: objectId,
        objectName: objectName,
        desc: desc,
        userId: operatorId,
        avatar: userData.avatar,
        type: type
    };
    yield index_1.AddMessage(applyMessage);
    return ctx.body = dataHandle_1.success({}, '发送成功!');
});
exports.rejectJoinGroup = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const rejectUserId = ctx.checkBody('userId').notEmpty().value;
    const projectId = ctx.checkBody('projectId').notEmpty().value;
    const messageId = ctx.checkBody('messageId').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,操作失败!');
    }
    const project = yield index_1.FindProjectById(projectId);
    const master = yield index_1.FindUserById(userId);
    const user = yield index_1.FindUserById(rejectUserId);
    // 通知用户被拒绝的消息
    const rejectMessage = {
        operatorId: userId,
        operatorName: master.userName,
        action: 'reject',
        projectId: projectId,
        objectId: rejectUserId,
        objectName: user.userName,
        desc: '用户 ' + user.userName + ' 被拒绝加入项目 ' + project.projectName,
        userId: userId,
        avatar: master.avatar,
        type: 'normal'
    };
    yield index_1.AddMessage(rejectMessage);
    // 将消息设置为已读不再显示
    const originMessage = yield index_1.FindMessageById(messageId);
    originMessage.readed = true;
    yield index_1.UpdateMessageReaded(originMessage);
    return ctx.body = dataHandle_1.success({}, '拒绝成功!');
});
exports.removeGroupMember = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const removeUserId = ctx.checkBody('userId').notEmpty().value;
    const projectId = ctx.checkBody('projectId').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,操作失败!');
    }
    yield index_1.RemoveGroupMember(projectId, removeUserId);
    // 添加对应接口更新消息
    const project = yield index_1.FindProjectById(projectId);
    const { userId } = ctx.tokenContent;
    const removeUserData = yield index_1.FindUserById(removeUserId);
    const userData = yield index_1.FindUserById(userId);
    const state = removeUserId == userId ? '退出' : '移出';
    const updateInterfaceMessage = {
        operatorId: userId,
        operatorName: userData.userName,
        action: 'remove',
        projectId: projectId,
        objectId: removeUserId,
        objectName: removeUserData.userName,
        desc: '用户 ' + removeUserData.userName + ' ' + state + ' 项目 ' + project.projectName,
        userId: userId,
        avatar: userData.avatar,
        type: 'normal'
    };
    yield index_1.AddMessage(updateInterfaceMessage);
    return ctx.body = dataHandle_1.success({}, state + '成功!');
});
exports.allowedJoinGroup = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const acceptUserId = ctx.checkBody('userId').notEmpty().value;
    const projectId = ctx.checkBody('projectId').notEmpty().value;
    const messageId = ctx.checkBody('messageId').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,操作失败!');
    }
    // 先将用户加入团队
    yield index_1.AddUserToTeam(projectId, acceptUserId);
    const project = yield index_1.FindProjectById(projectId);
    const master = yield index_1.FindUserById(userId);
    const user = yield index_1.FindUserById(acceptUserId);
    // 通知用户被允许加入的消息
    const acceptMessage = {
        operatorId: userId,
        operatorName: master.userName,
        action: 'accept',
        projectId: projectId,
        objectId: acceptUserId,
        objectName: user.userName,
        desc: '用户 ' + user.userName + ' 被允许加入项目 ' + project.projectName,
        userId: userId,
        avatar: master.avatar,
        type: 'normal'
    };
    yield index_1.AddMessage(acceptMessage);
    // 将消息设置为已读不再显示
    const originMessage = yield index_1.FindMessageById(messageId);
    originMessage.readed = true;
    yield index_1.UpdateMessageReaded(originMessage);
    return ctx.body = dataHandle_1.success({}, '加入成功!');
});
exports.invitedGroupMember = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const userEmail = ctx.checkBody('userEmail').notEmpty().value;
    const projectId = ctx.checkBody('projectId').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,操作失败!');
    }
    const inviter = yield index_1.FindUserById(userId);
    const user = yield index_1.FindUserByEmail(userEmail);
    if (!user) {
        return ctx.body = dataHandle_1.error('指定邮箱不存在!');
    }
    // 判断指定用户是否在团队中
    const team = yield index_1.FindTeamByProjectId(projectId);
    let find = false;
    if (team.masterId.toString() === user._id.toString()) {
        find = true;
    }
    team.member.map((item) => {
        if (item._id.toString() === user._id.toString()) {
            find = true;
        }
    });
    if (find) {
        return ctx.body = dataHandle_1.error('该成员已经在团队中!');
    }
    else {
        // 通知用户被邀请的消息
        const invitedMessage = {
            operatorId: inviter._id,
            operatorName: inviter.userName,
            action: 'invite',
            projectId: projectId,
            objectId: team.projectName,
            objectName: user.userName,
            desc: '用户' + user.userName + ' 被邀请加入项目 ' + team.projectName,
            userId: user._id,
            avatar: user.avatar,
            type: 'team'
        };
        yield index_1.AddMessage(invitedMessage);
    }
    return ctx.body = dataHandle_1.success({}, '邀请成功!');
});
//# sourceMappingURL=team.js.map