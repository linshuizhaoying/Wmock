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
const dataHandle_1 = require("../utils/dataHandle");
// import { AllProject } from '../db/controllers/index';
const index_1 = require("../db/controllers/index");
const { VM } = require('vm2');
const Mock = require('mockjs');
exports.mock = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const method = ctx.request.method.toLowerCase();
    // 获取接口路径内容
    const { projectId, mockURL } = ctx.pathNode;
    const findMock = yield index_1.FindInterfaceByMock(projectId, mockURL.replace('/', ''));
    console.log('findMock', findMock);
    console.log('method', findMock.method);
    // 如果请求的Method不符合设定
    if (findMock.method !== method) {
        return ctx.body = dataHandle_1.error('请求方法错误,请重试');
    }
    // 模拟数据
    Mock.Handler.function = function (options) {
        options.Mock = Mock;
        // 传入 request cookies，方便使用
        options._req = ctx.request;
        return options.template.call(options.context.currentContext, options);
    };
    // const findMock.mode = `{success :true, data: { default: "hah", _req: function({ _req }) { return _req }, name: function({ _req }) { return _req.query.name || this.default }}}`
    const temp = JSON.stringify(findMock.mode);
    const vm = new VM({
        timeout: 1000,
        sandbox: {
            Mock: Mock,
            mode: findMock.mode,
            template: new Function(`return ${findMock.mode}`)
        }
    });
    vm.run('Mock.mock(new Function("return " + mode)())'); // 数据验证，检测 setTimeout 等方法, 顺便将内部的函数执行了
    // console.log(Mock.Handler.function(new Function('return ' + findMock.mode)()))
    const apiData = vm.run('Mock.mock(template())');
    console.log('apiData2333', apiData);
    const result = dataHandle_1.success(apiData, '返回成功');
    // console.log(result)
    return ctx.body = result;
});
//# sourceMappingURL=mock.js.map