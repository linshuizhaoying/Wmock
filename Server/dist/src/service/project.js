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
exports.addProject = (ctx) => __awaiter(this, void 0, void 0, function* () {
    // 添加项目
    const { userId } = ctx.tokenContent;
    const project = ctx.request.body;
    const projectName = ctx.checkBody('projectName').notEmpty().len(1, 32).value;
    const projectUrl = ctx.checkBody('projectUrl').notEmpty().len(1, 20).value;
    const projectDesc = ctx.checkBody('projectDesc').notEmpty().len(1, 20).value;
    const type = ctx.checkBody('type').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,添加失败!');
    }
    project.masterId = userId;
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
    const user = yield index_1.FindUserById(userId);
    team.masterAvatar = user.avatar;
    team.masterId = user._id;
    team.role = user.role;
    team.masterName = user.userName;
    team.projectId = result;
    team.projectName = projectName;
    yield index_1.AddTeam(team);
    return ctx.body = dataHandle_1.success({}, '添加项目成功!');
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
//# sourceMappingURL=project.js.map