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
const _ = require("lodash");
exports.documentList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const data = yield index_1.AllDocument();
    const result = [];
    const userJoinProject = [];
    // 筛选出与用户有关的文档显示出来
    yield Promise.all(data.map((item) => __awaiter(this, void 0, void 0, function* () {
        // 如果文档是用户建立的,自然放进去
        if (item.ownerId.toString() === userId.toString()) {
            result.push(item);
            // 如果这个文档有分配给其它项目
            if (item.assign.length > 0) {
                item.assign.map((projectId) => {
                    // 把分配的Id加进去
                    userJoinProject.push(projectId);
                });
            }
        }
    })));
    console.log("userJoinProject", userJoinProject);
    console.log(data.length);
    yield Promise.all(data.map((item) => __awaiter(this, void 0, void 0, function* () {
        // 不然对分配的项目进行查找,看看团队里有没有用户
        if (item.ownerId != userId) {
            yield Promise.all(item.assign.map((projectId) => __awaiter(this, void 0, void 0, function* () {
                const teamData = yield index_1.FindTeamByProjectId(projectId);
                console.log("teamData", teamData);
                // 如果成员分配了自己的文档给项目
                if (teamData.masterId.toString() === userId.toString()) {
                    result.push(item);
                }
                teamData.member.map((user) => {
                    // 如果用户属于这个团队,那么他同样能够查询该项目的文档
                    if (user._id.toString() === userId.toString()) {
                        result.push(item);
                    }
                });
                // 如果其它分配项目中包含用户的项目Id,说明项目中有人建立了新的文档分配给它
                if (userJoinProject.indexOf(projectId) > -1) {
                    result.push(item);
                }
            })));
        }
    })));
    console.log(result.length);
    return (ctx.body = dataHandle_1.success(yield _.uniqBy(result, "_id"), "获取成功"));
});
exports.addDocument = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const document = ctx.request.body;
    const assign = ctx.checkBody("assign").notEmpty().value;
    const content = ctx.checkBody("content").notEmpty().value;
    const desc = ctx.checkBody("desc").notEmpty().value;
    const name = ctx.checkBody("name").notEmpty().value;
    const type = ctx.checkBody("type").notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return (ctx.body = dataHandle_1.error("用户数据不正常,添加失败!"));
    }
    const userData = yield index_1.FindUserById(userId);
    document.ownerName = userId;
    document.ownerId = userId;
    yield index_1.AddDocument(document);
    return (ctx.body = dataHandle_1.success({}, "添加成功!"));
});
exports.updateDocument = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const document = ctx.request.body;
    const assign = ctx.checkBody("assign").notEmpty().value;
    const content = ctx.checkBody("content").notEmpty().value;
    const desc = ctx.checkBody("desc").notEmpty().value;
    const name = ctx.checkBody("name").notEmpty().value;
    const type = ctx.checkBody("type").notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return (ctx.body = dataHandle_1.error("用户数据不正常,添加失败!"));
    }
    yield index_1.UpdateDocument(document);
    // 添加对应文档更新消息
    const userData = yield index_1.FindUserById(userId);
    const updateDocumentMessage = {
        operatorId: userId,
        operatorName: userData.userName,
        action: "update",
        projectId: "",
        objectId: document._id,
        objectName: name,
        desc: "用户 " + userData.userName + " 更新了文档 " + name,
        userId: userId,
        avatar: userData.avatar,
        type: "document"
    };
    yield index_1.AddMessage(updateDocumentMessage);
    return (ctx.body = dataHandle_1.success({}, "更新成功!"));
});
exports.removeDocument = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { id } = ctx.request.body;
    yield index_1.RemoveDocument(id);
    return (ctx.body = dataHandle_1.success({}, "删除成功!"));
});
//# sourceMappingURL=document.js.map