"use strict";
// import { AllProject } from '../db/controllers/index';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.mock = (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log('mock');
    console.log(ctx);
    console.log(ctx.params);
    const method = ctx.request.method.toLowerCase();
    let result;
    switch (method) {
        case 'get':
            result = success({ 'msg': '你调用了get方法' });
            break;
        case 'post':
            result = success({ 'msg': '你调用了post方法' });
            break;
        case 'put':
            result = success({ 'msg': '你调用了put方法' });
            break;
        case 'patch':
            result = success({ 'msg': '你调用了patch方法' });
            break;
        case 'delete':
            result = success({ 'msg': '你调用了delete方法' });
            break;
        default:
            result = error();
    }
    // console.log(result)
    return ctx.body = result;
});
//# sourceMappingURL=mock.js.map