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
exports.FindProjectById = (projectId) => __awaiter(this, void 0, void 0, function* () {
    return yield Project.findOne({ _id: projectId });
});
exports.DemoProject = (userId) => __awaiter(this, void 0, void 0, function* () {
    return yield Project.find({ masterId: userId, type: 'demo' });
});
exports.UserProject = (userId) => __awaiter(this, void 0, void 0, function* () {
    return yield Project.find({ masterId: userId, type: 'user' });
});
exports.UnJoinProjectList = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log(id);
    const data = [
        {
            projectId: 'proejct110',
            projectName: '尚未加入的项目001',
        },
        {
            projectId: 'proejct111',
            projectName: '尚未加入的项目002',
        },
        {
            projectId: 'proejct112',
            projectName: '尚未加入的项目003',
        }
    ];
    return yield data;
});
exports.AddProject = (project) => __awaiter(this, void 0, void 0, function* () {
    const newProject = new Project(project);
    let result;
    yield newProject.save((error) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            result = error.toString();
        }
    })).then((project) => __awaiter(this, void 0, void 0, function* () {
        result = project._id;
        const newProject = project;
        newProject.transferUrl = project.transferUrl + '/' + project._id;
        yield exports.UpdateProject(newProject);
    }));
    return result;
});
exports.UpdateProject = (project) => __awaiter(this, void 0, void 0, function* () {
    return Project.update({
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