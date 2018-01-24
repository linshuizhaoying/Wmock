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
// import { AllProject } from '../db/controllers/index';
const { VM } = require('vm2');
const Mock = require('mockjs');
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
    // let { projectId, mockURL } = ctx.pathNode
    // 获取接口路径内容
    console.log('ctx.pathNode', ctx.pathNode);
    // 匹配内容是否一致
    console.log('验证内容中...');
    // 模拟数据
    Mock.Handler.function = function (options) {
        console.log('start Handle');
        options.Mock = Mock;
        // 传入 request cookies，方便使用
        options._req = ctx.request;
        return options.template.call(options.context.currentContext, options);
    };
    console.log('Mock.Handler', Mock.Handler.function);
    const testMode = `{
    'title': 'Syntax Demo',
    'string1|1-10': '★',
    'string2|3': 'value',
    'number1|+1': 100,
    'number2|1-100': 100,
    'number3|1-100.1-10': 1,
    'number4|123.1-10': 1,
    'number5|123.3': 1,
    'number6|123.10': 1.123,
    'boolean1|1': true,
    'boolean2|1-2': true,
    'object1|2-4': {
        '110000': '北京市',
        '120000': '天津市',
        '130000': '河北省',
        '140000': '山西省'
    },
    'object2|2': {
        '310000': '上海市',
        '320000': '江苏省',
        '330000': '浙江省',
        '340000': '安徽省'
    },
    'array1|1': ['AMD', 'CMD', 'KMD', 'UMD'],
    'array2|1-10': ['Mock.js'],
    'array3|3': ['Mock.js'],
    'function': function() {
        return this.title
    }
}`;
    // const testMode = `{success :true, data: { default: "hah", _req: function({ _req }) { return _req }, name: function({ _req }) { return _req.query.name || this.default }}}`
    const temp = JSON.stringify(testMode);
    const vm = new VM({
        timeout: 1000,
        sandbox: {
            Mock: Mock,
            mode: testMode,
            template: new Function(`return ${testMode}`)
        }
    });
    vm.run('Mock.mock(new Function("return " + mode)())'); // 数据验证，检测 setTimeout 等方法, 顺便将内部的函数执行了
    // console.log(Mock.Handler.function(new Function('return ' + testMode)()))
    const apiData = vm.run('Mock.mock(template())');
    console.log('apiData2333', apiData);
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