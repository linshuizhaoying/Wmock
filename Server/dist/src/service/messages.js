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
    const result = yield index_1.AllMessages();
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.addMessage = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const data = ctx.request.body;
    const { userId } = ctx.tokenContent;
    const result = yield index_1.AddMessage(data);
    return ctx.body = dataHandle_1.success({}, '添加成功!');
});
exports.updateMessage = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    console.log(userId);
    const result = yield index_1.AllMessages();
    return ctx.body = dataHandle_1.success(result, '更新成功');
});
//# sourceMappingURL=messages.js.map