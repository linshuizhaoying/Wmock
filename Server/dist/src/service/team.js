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
exports.teamList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const result = yield index_1.TeamList(userId);
    // console.log(result)
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.sendApply = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const apply = ctx.request.body;
    console.log(apply);
    return ctx.body = dataHandle_1.success({}, '发送成功!');
});
exports.rejectJoinGroup = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const member = ctx.request.body;
    console.log(member);
    return ctx.body = dataHandle_1.success({}, '拒绝成功!');
});
exports.removeGroupMember = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const member = ctx.request.body;
    console.log(member);
    return ctx.body = dataHandle_1.success({}, '移除成功!');
});
exports.allowedJoinGroup = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const member = ctx.request.body;
    console.log(member);
    return ctx.body = dataHandle_1.success({}, '加入成功!');
});
exports.invitedGroupMember = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const member = ctx.request.body;
    console.log(member);
    return ctx.body = dataHandle_1.success({}, '邀请成功!');
});
//# sourceMappingURL=team.js.map