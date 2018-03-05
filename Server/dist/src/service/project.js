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
const interface_1 = require("./interface");
const mock_1 = require("./mock");
const dataHandle_1 = require("../utils/dataHandle");
const tools_1 = require("../utils/tools");
const _ = require('lodash');
const field = require('../db/models/field');
const getProjectList = (projectList) => __awaiter(this, void 0, void 0, function* () {
    const result = [];
    yield Promise.all(projectList.map((oldItem) => __awaiter(this, void 0, void 0, function* () {
        // 洗下项目数据
        const item = _.pick(oldItem, field.projectField);
        // 获取团队信息
        const team = yield index_1.FindTeamByProjectId(item._id);
        // 获取对应接口信息
        const interfaceOldData = yield index_1.InterfaceList(item._id);
        // 洗下接口数据
        const interfaceList = interfaceOldData.map((item) => _.pick(item, field.interfaceField));
        const temp = {
            _id: '',
            userName: '',
            role: '',
            avatar: ''
        };
        temp._id = team.masterId;
        temp.avatar = team.masterAvatar;
        temp.role = team.role;
        temp.userName = team.masterName;
        const teamMember = [];
        // 团队列表加入创始者
        teamMember.push(temp);
        // 团队列表加入成员
        yield team.member.map((member) => {
            temp._id = member._id;
            temp.avatar = member.avatar;
            temp.role = member.role;
            temp.userName = member.userName;
            teamMember.push(temp);
        });
        const fullProject = item;
        fullProject['teamMember'] = yield teamMember;
        fullProject['interfaceList'] = yield interfaceList;
        result.push(fullProject);
        return fullProject;
    })));
    // 对名称做个排序
    result.sort((a, b) => {
        return a.projectName < b.projectName ? -1 : 1;
    });
    return result;
});
exports.userProjectList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    let result = [];
    // 获取项目信息
    const projectList = yield index_1.UserProject(userId);
    result = yield getProjectList(projectList);
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.demoProjectList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    let result = [];
    // 获取项目信息
    const projectList = yield index_1.DemoProject(userId);
    result = yield getProjectList(projectList);
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.unJoinProjectList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const result = yield index_1.UnJoinProjectList(userId);
    // console.log(result)
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
const addUserProject = (userId, project) => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.AddProject(project);
    // 添加对应团队
    const team = {
        masterAvatar: '',
        masterId: '',
        role: '',
        masterName: '',
        projectId: '',
        projectName: '',
        member: []
    };
    const userData = yield index_1.FindUserById(userId);
    // 添加对应项目消息
    const projectMessage = {
        operatorId: userId,
        operatorName: userData.userName,
        action: 'add',
        projectId: result,
        objectId: result,
        objectName: project.projectName,
        desc: '添加了新项目: ' + project.projectName,
        userId: userId,
        avatar: userData.avatar,
        type: 'normal'
    };
    team.masterAvatar = userData.avatar;
    team.masterId = userData._id;
    team.role = userData.role;
    team.masterName = userData.userName;
    team.projectId = result;
    team.projectName = project.projectName;
    const teamId = yield index_1.AddTeam(team);
    console.log('teamId', teamId);
    // 添加对应项目消息
    const teamMessage = {
        operatorId: userId,
        operatorName: userData.userName,
        action: 'add',
        projectId: result,
        objectId: teamId,
        objectName: project.projectName,
        desc: '添加了新团队: ' + project.projectName,
        userId: userId,
        avatar: userData.avatar,
        type: 'normal'
    };
    yield index_1.AddMessage(projectMessage);
    yield index_1.AddMessage(teamMessage);
    return result;
});
exports.addProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    // 添加项目
    const { userId } = ctx.tokenContent;
    const project = ctx.request.body;
    const projectName = ctx.checkBody('projectName').notEmpty().len(1, 32).value;
    const projectUrl = ctx.checkBody('projectUrl').notEmpty().len(1, 20).value;
    const projectDesc = ctx.checkBody('projectDesc').notEmpty().len(1, 20).value;
    const ProjectTransferUrl = ctx.checkBody('transferUrl').notEmpty();
    const type = ctx.checkBody('type').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,添加失败!');
    }
    project.masterId = userId;
    yield addUserProject(userId, project);
    return ctx.body = dataHandle_1.success({}, '添加项目成功!');
});
exports.updateProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const project = ctx.request.body;
    const _id = ctx.checkBody('_id').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,更新失败!');
    }
    const currentProject = yield index_1.FindProjectById(_id);
    // 如果不是格式正常或者不是正在修改的属性,则保留原先数据
    currentProject.projectName = project.projectName || currentProject.projectName;
    currentProject.projectUrl = project.projectUrl || currentProject.projectUrl;
    currentProject.projectDesc = project.projectDesc || currentProject.projectDesc;
    currentProject.version = project.version || currentProject.version;
    currentProject.transferUrl = project.transferUrl || currentProject.transferUrl;
    currentProject.status = project.status || currentProject.status;
    currentProject.type = project.type || currentProject.type;
    currentProject.masterId = project.masterId || currentProject.masterId;
    console.log(currentProject);
    const result = yield index_1.UpdateProject(currentProject);
    // 添加对应项目更新消息
    const { userId } = ctx.tokenContent;
    const userData = yield index_1.FindUserById(userId);
    const updateProjectMessage = {
        operatorId: userId,
        operatorName: userData.userName,
        action: 'update',
        projectId: _id,
        objectId: _id,
        objectName: currentProject.projectName,
        desc: '用户 ' + userData.userName + ' 更新了项目 ' + currentProject.projectName,
        userId: userId,
        avatar: userData.avatar,
        type: 'normal'
    };
    yield index_1.AddMessage(updateProjectMessage);
    return ctx.body = dataHandle_1.success(result, '更新成功!');
});
exports.removeProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const project = ctx.request.body;
    const id = ctx.checkBody('id').notEmpty().value;
    if (ctx.errors) {
        return ctx.body = dataHandle_1.error('用户数据不正常,删除失败!');
    }
    // 先批量删除对应项目下的接口
    const interfaceListData = yield index_1.InterfaceList(id);
    yield interfaceListData.map((item) => __awaiter(this, void 0, void 0, function* () { return yield index_1.RemoveInterface(item._id); }));
    const result = yield index_1.RemoveProject(id);
    return ctx.body = dataHandle_1.success({}, '删除成功!');
});
exports.importProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const data = ctx.request.body;
    const newProjectId = yield addUserProject(data.masterId, data);
    // 批量添加接口
    yield data.interfaceList.map((item) => __awaiter(this, void 0, void 0, function* () {
        item.projectId = newProjectId; // 将项目Id替换为新增加的项目
        yield index_1.AddInterface(item);
    }));
    return ctx.body = dataHandle_1.success({}, '导入成功!');
});
/**
 * 项目的克隆不再是和接口一样简单的新建一个接口然后把原接口内容复制过去
 * 因为项目其实包含了不少数组信息,不过克隆项目只需要把里面的接口信息一并克隆即可，
 * 里面的团队信息是不需要的。
 * 因此需要调用cloneInterface接口来批量更改接口
 */
exports.cloneProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const { projectId, type } = ctx.request.body;
    const vaildProjectId = ctx.checkBody('projectId').notEmpty().value;
    if (ctx.errors) {
        return ctx.body = dataHandle_1.error('用户数据不正常,克隆失败!');
    }
    const oldProject = yield index_1.FindProjectById(projectId);
    const newProject = {
        projectName: oldProject.projectName,
        projectUrl: oldProject.projectUrl,
        projectDesc: oldProject.projectDesc,
        version: oldProject.version,
        transferUrl: oldProject.transferUrl,
        status: oldProject.status,
        type: type,
        masterId: userId
    };
    const newProjectId = yield index_1.AddProject(newProject);
    // 添加对应团队
    const team = {
        masterAvatar: '',
        masterId: '',
        role: '',
        masterName: '',
        projectId: '',
        projectName: '',
        member: []
    };
    const user = yield index_1.FindUserById(userId);
    team.masterAvatar = user.avatar;
    team.masterId = user._id;
    team.role = user.role;
    team.masterName = user.userName;
    team.projectId = newProjectId;
    team.projectName = oldProject.projectName;
    yield index_1.AddTeam(team);
    // 获取旧项目的接口信息
    const interfaceListData = yield index_1.InterfaceList(projectId);
    // 批量克隆接口到新项目上
    yield interfaceListData.map((item) => __awaiter(this, void 0, void 0, function* () { return yield interface_1.cloneInterfaceItem(newProjectId, item._id); }));
    return ctx.body = dataHandle_1.success({}, '克隆成功!');
});
exports.verifyProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { id } = ctx.request.body;
    console.log(id);
    const project = yield index_1.FindProjectById(id);
    if (project.status === 'mock') {
        return ctx.body = dataHandle_1.error('自动校验只用于接口转发模式!');
    }
    // 找到所有接口然后一一去匹配
    const interfaceListData = yield index_1.InterfaceList(id);
    const verifyResult = [];
    let allMatch = true;
    yield Promise.all(yield interfaceListData.map((item) => __awaiter(this, void 0, void 0, function* () {
        const remoteData = yield mock_1.getRemoteData(item.method, project.transferUrl + '/' + item.url);
        // const diffResult = await FindDifferent(item.mode, remoteData)
        const formatData = { interfaceName: '', expect: '', actual: '', compare: '' };
        formatData.interfaceName = item.interfaceName;
        formatData.expect =
            JSON.parse(JSON.parse(JSON.stringify(item.mode)
                .replace(/\n/g, '')).replace(/\n/g, ' '));
        formatData.actual = JSON.parse(JSON.stringify(remoteData));
        formatData.compare = tools_1.isEqual(formatData.expect, formatData.actual) === true ? 'match' : 'dismatch';
        if (formatData.compare !== 'match') {
            allMatch = false;
        }
        verifyResult.push(formatData);
    })));
    console.log('verifyResult', verifyResult);
    return ctx.body = dataHandle_1.success({
        result: allMatch ? 'yes' : 'no',
        data: verifyResult
    }, '验证成功');
});
//# sourceMappingURL=project.js.map