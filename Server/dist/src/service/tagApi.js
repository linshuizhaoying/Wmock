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
exports.addTag = (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log('addTag');
    console.log(ctx.request.body);
    const { tagTitle, status } = ctx.request.body;
    yield index_1.AddTag({ tagTitle, status });
    return ctx.body = success('');
});
exports.allTags = (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log('allTags');
    console.log(ctx.request.body);
    const result = yield index_1.AllTags();
    return ctx.body = success(result);
});
exports.updateTag = (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log('updateTag');
    console.log(ctx.request.body);
    const { id } = ctx.request.body;
    const { tagTitle, status } = ctx.request.body;
    return ctx.body = yield index_1.UpdateTag(id, { tagTitle, status });
});
//# sourceMappingURL=tagApi.js.map