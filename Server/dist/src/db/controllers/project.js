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
const Project = require('../models/project');
const team_1 = require("./team");
exports.FindProjectListByUserId = (userId) => __awaiter(this, void 0, void 0, function* () {
    const allProject = yield Project.find({});
    // 返回与用户相关的所有项目
    const relatedProjectMap = new Map();
    yield Promise.all(allProject.map((oldItem) => __awaiter(this, void 0, void 0, function* () {
        // 先添加自己创建的项目
        if (userId === oldItem.masterId) {
            relatedProjectMap[oldItem._id] = true;
        }
        // 对不是自己创建的项目进行判断
        if (userId !== oldItem.masterId) {
            // 找到对应的团队
            const projectTeam = yield team_1.FindTeamByProjectId(oldItem._id);
            yield projectTeam.member.map((user) => __awaiter(this, void 0, void 0, function* () {
                // 如果对应的团队里面有该用户，则加入相关的项目列表
                if (user._id == userId) {
                    relatedProjectMap[projectTeam.projectId] = true;
                }
            }));
        }
    })));
    return relatedProjectMap;
});
exports.FindProjectListById = (projectId) => __awaiter(this, void 0, void 0, function* () {
    return yield Project.find({ _id: projectId });
});
exports.FindProjectById = (projectId) => __awaiter(this, void 0, void 0, function* () {
    return yield Project.findOne({ _id: projectId });
});
exports.DemoProject = (userId) => __awaiter(this, void 0, void 0, function* () {
    const projectMap = yield exports.FindProjectListByUserId(userId);
    const projectList = [];
    for (const projectId in projectMap) {
        const temp = yield exports.FindProjectById(projectId);
        if (temp.type === 'demo') {
            projectList.push(temp);
        }
    }
    return projectList;
    // return await Project.find({ masterId: userId, type: 'demo' })
});
exports.UserProject = (userId) => __awaiter(this, void 0, void 0, function* () {
    // return await Project.find({ masterId: userId, type: 'user' })
    const projectMap = yield exports.FindProjectListByUserId(userId);
    const projectList = [];
    for (const projectId in projectMap) {
        const temp = yield exports.FindProjectById(projectId);
        if (temp.type === 'user') {
            projectList.push(temp);
        }
    }
    return projectList;
});
exports.UnJoinProjectList = (userId) => __awaiter(this, void 0, void 0, function* () {
    console.log(userId);
    const allProject = yield Project.find({});
    const unJoinList = [];
    yield Promise.all(allProject.map((oldItem) => __awaiter(this, void 0, void 0, function* () {
        let found = false;
        // 先找到不是自己创建的项目
        if (userId !== oldItem.masterId) {
            // 找到对应的团队
            const projectTeam = yield team_1.FindTeamByProjectId(oldItem._id);
            yield projectTeam.member.map((user) => __awaiter(this, void 0, void 0, function* () {
                // 如果对应的团队里面也没有该用户，说明是未加入的团队
                if (user._id == userId) {
                    found = true;
                }
            }));
            if (!found) {
                const result = {
                    projectId: '',
                    projectName: ''
                };
                result.projectId = oldItem._id;
                result.projectName = oldItem.projectName;
                unJoinList.push(result);
            }
        }
    })));
    console.log('自己未加入的团队', unJoinList);
    return unJoinList;
});
exports.AddProject = (originProject) => __awaiter(this, void 0, void 0, function* () {
    const newProject = new Project(originProject);
    let result;
    yield newProject.save((error) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            result = error.toString();
        }
    })).then((project) => __awaiter(this, void 0, void 0, function* () {
        result = project._id;
        // 如果不是导入的
        if (!originProject.version) {
            const newProject = project;
            newProject.transferUrl = project.transferUrl + '/' + project._id;
            yield exports.UpdateProject(newProject);
        }
    }));
    return result;
});
exports.UpdateProject = (project) => __awaiter(this, void 0, void 0, function* () {
    return yield Project.update({
        _id: project._id
    }, {
        $set: {
            projectName: project.projectName,
            projectUrl: project.projectUrl,
            projectDesc: project.projectDesc,
            version: project.version,
            transferUrl: project.transferUrl,
            status: project.status,
            type: project.type
        }
    });
});
exports.RemoveProject = (id) => __awaiter(this, void 0, void 0, function* () {
    return Project.remove({
        _id: id
    });
});
//# sourceMappingURL=project.js.map