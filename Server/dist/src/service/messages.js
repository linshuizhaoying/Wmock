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
exports.messagesList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const result = yield index_1.AllMessages(userId);
    return (ctx.body = dataHandle_1.success(result, "获取成功"));
});
exports.documentMessages = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const documentId = ctx.checkBody("id").notEmpty().value;
    // console.log('documentId: ', documentId)
    if (ctx.errors) {
        // console.log(ctx.errors)
        return ctx.body = dataHandle_1.error('用户数据不正常,获取失败!');
    }
    const result = yield index_1.DocumentMessages(documentId);
    // console.log('result', result)
    return (ctx.body = dataHandle_1.success(result, "获取成功"));
});
exports.addMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    yield index_1.AddMessage(message);
});
//# sourceMappingURL=messages.js.map