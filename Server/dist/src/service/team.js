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
// 返回正常数据
const success = (data) => {
    return {
        'state': {
            'code': 1,
            'msg': 'success'
        },
        'data': {
            data
        }
    };
};
// // 返回错误提醒
// const error = () => {
//   return{
//     'state': {
//         'code': 2,
//         'msg':  'error'
//     }
//   }
// }
exports.teamList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    // console.log('allNews')
    // console.log(ctx.request.body)
    const { id } = ctx.request.body;
    const result = yield index_1.myTeam(id);
    // console.log(result)
    return ctx.body = success(result);
});
exports.sendApply = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const apply = ctx.request.body;
    console.log(apply);
    return ctx.body = success('发送成功!');
});
exports.rejectJoinGroup = (ctx) => __awaiter(this, void 0, void 0, function* () {
    return ctx.body = success('');
});
exports.removeGroupMember = (ctx) => __awaiter(this, void 0, void 0, function* () {
    return ctx.body = success('');
});
exports.allowedJoinGroup = (ctx) => __awaiter(this, void 0, void 0, function* () {
    return ctx.body = success('');
});
exports.invitedGroupMember = (ctx) => __awaiter(this, void 0, void 0, function* () {
    return ctx.body = success('');
});
//# sourceMappingURL=team.js.map