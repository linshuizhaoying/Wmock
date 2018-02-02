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
// 返回错误提醒
const error = () => {
    return {
        'state': {
            'code': 2,
            'msg': 'error'
        }
    };
};
exports.baseModelList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.BaseModelList();
    return ctx.body = success(result);
});
exports.customModelList = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { id } = ctx.request.body;
    const result = yield index_1.CustomModelList(id);
    return ctx.body = success(result);
});
exports.addModel = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const model = ctx.request.body;
    console.log(model);
    return ctx.body = success('添加成功!');
});
exports.updateModel = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const model = ctx.request.body;
    console.log(model);
    return ctx.body = success('更新成功!');
});
exports.removeModel = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const model = ctx.request.body;
    console.log(model);
    return ctx.body = success('删除成功!');
});
//# sourceMappingURL=model.js.map