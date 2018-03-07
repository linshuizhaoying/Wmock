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
exports.documentList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const data = yield index_1.AllDocument();
    const result = [];
    // 筛选出与用户有关的文档显示出来
    yield Promise.all(data.map((item) => __awaiter(this, void 0, void 0, function* () {
        // 如果文档是用户建立的,自然放进去
        if (item.ownerId == userId) {
            result.push(item);
        }
        else {
            // 不然对分配的项目进行查找,看看团队里有没有用户
            yield Promise.all(item.assign.map((projectId) => __awaiter(this, void 0, void 0, function* () {
                const teamData = yield index_1.FindTeamByProjectId(projectId);
                teamData.member.map((user) => {
                    // 如果用户属于这个团队,那么他同样能够查询该项目的文档
                    if (user._id == userId) {
                        result.push(item);
                    }
                });
            })));
        }
        console.log('result', result);
    })));
    console.log('final', result);
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.addDocument = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const document = ctx.request.body;
    const assign = ctx.checkBody('assign').notEmpty().value;
    const content = ctx.checkBody('content').notEmpty().value;
    const desc = ctx.checkBody('desc').notEmpty().value;
    const name = ctx.checkBody('name').notEmpty().value;
    const type = ctx.checkBody('type').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,添加失败!');
    }
    const userData = yield index_1.FindUserById(userId);
    document.ownerName = userData.userName;
    document.ownerId = userId;
    yield index_1.AddDocument(document);
    // // 添加对应文档增加消息
    // const addDocumentMessage: MessageData = {
    //   operatorId: userId,
    //   operatorName: userData.userName,
    //   action: 'add',
    //   projectId: '',
    //   objectId: documentId,
    //   objectName: name,
    //   desc: '用户 ' + userData.userName + ' 增加了文档 ' + name,
    //   userId: userId,
    //   avatar: userData.avatar,
    //   type: 'normal'
    // }
    // await AddMessage(addDocumentMessage)
    return ctx.body = dataHandle_1.success({}, '添加成功!');
});
exports.updateDocument = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const document = ctx.request.body;
    const assign = ctx.checkBody('assign').notEmpty().value;
    const content = ctx.checkBody('content').notEmpty().value;
    const desc = ctx.checkBody('desc').notEmpty().value;
    const name = ctx.checkBody('name').notEmpty().value;
    const type = ctx.checkBody('type').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,添加失败!');
    }
    yield index_1.UpdateDocument(document);
    // // 添加对应文档更新消息
    // const userData: UserData = await FindUserById(userId)
    // const updateDocumentMessage: MessageData = {
    //   operatorId: userId,
    //   operatorName: userData.userName,
    //   action: 'add',
    //   projectId: '',
    //   objectId: document._id,
    //   objectName: name,
    //   desc: '用户 ' + userData.userName + ' 更新了文档 ' + name,
    //   userId: userId,
    //   avatar: userData.avatar,
    //   type: 'normal'
    // }
    // await AddMessage(updateDocumentMessage)
    return ctx.body = dataHandle_1.success({}, '更新成功!');
});
exports.removeDocument = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const { id } = ctx.request.body;
    yield exports.removeDocument(id);
    return ctx.body = dataHandle_1.success({}, '删除成功!');
});
//# sourceMappingURL=document.js.map