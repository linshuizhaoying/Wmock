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
    yield newProject.save((error) => {
        if (error) {
            result = error.toString();
        }
    }).then((project) => {
        result = project._id;
    });
    return result;
});
exports.UpdateProject = (project) => __awaiter(this, void 0, void 0, function* () {
});
exports.RemoveProject = (id) => __awaiter(this, void 0, void 0, function* () {
});
//# sourceMappingURL=project.js.map