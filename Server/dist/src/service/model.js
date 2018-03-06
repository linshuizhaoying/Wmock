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
exports.baseModelList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.BaseModelList();
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.customModelList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const result = yield index_1.CustomModelList(userId);
    return ctx.body = dataHandle_1.success(result, '获取成功');
});
exports.addModel = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const model = ctx.request.body;
    const modelDesc = ctx.checkBody('modelDesc').notEmpty().value;
    const modelMode = ctx.checkBody('modelMode').notEmpty().value;
    const modelDataName = ctx.checkBody('modelDataName').notEmpty().value;
    const userId = ctx.checkBody('userId').notEmpty().value;
    const userName = ctx.checkBody('userName').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,添加失败!');
    }
    yield index_1.AddModel(model);
    return ctx.body = dataHandle_1.success({}, '添加成功!');
});
exports.updateModel = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const model = ctx.request.body;
    const modelDesc = ctx.checkBody('modelDesc').notEmpty().value;
    const modelMode = ctx.checkBody('modelMode').notEmpty().value;
    const modelDataName = ctx.checkBody('modelDataName').notEmpty().value;
    const _id = ctx.checkBody('_id').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,更新失败!');
    }
    yield index_1.UpdateModel(model);
    return ctx.body = dataHandle_1.success({}, '更新成功!');
});
exports.removeModel = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { id } = ctx.request.body;
    const modelId = ctx.checkBody('id').notEmpty().value;
    if (ctx.errors) {
        console.log(ctx.errors);
        return ctx.body = dataHandle_1.error('用户数据不正常,删除失败!');
    }
    yield index_1.RemoveModel(id);
    return ctx.body = dataHandle_1.success({}, '删除成功!');
});
//# sourceMappingURL=model.js.map