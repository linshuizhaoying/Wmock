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
const axios = require('axios');
exports.getModeMock = (mock) => __awaiter(this, void 0, void 0, function* () {
    Mock.Handler.function = function (options) {
        options._req = {};
        options.Mock = Mock;
        return options.template.call(options.context.currentContext, options);
    };
    const temp = JSON.stringify(mock);
    const vm = new VM({
        timeout: 1000,
        sandbox: {
            Mock: Mock,
            mode: mock,
            template: new Function(`return ${mock}`)
        }
    });
    vm.run('Mock.mock(new Function("return " + mode)())'); // 数据验证，检测 setTimeout 等方法, 顺便将内部的函数执行了
    const result = vm.run('Mock.mock(template())');
    return result;
});
exports.getRemoteData = (method, url, query = '', body = '') => __awaiter(this, void 0, void 0, function* () {
    let result = '';
    try {
        const apiData = yield axios({
            method: method,
            url: url,
            params: Object.assign({}, query),
            data: body,
            timeout: 3000
        }).then((res) => {
            return res.data;
        });
        result = apiData;
    }
    catch (error) {
        result = '';
    }
    return result;
});
exports.mock = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { query, body } = ctx.request;
    const method = ctx.request.method.toLowerCase();
    // 获取接口路径内容
    const { projectId, mockURL } = ctx.pathNode;
    const foundMock = yield index_1.FindInterfaceByMock(projectId, mockURL.replace('/', ''), method);
    const foundProject = yield index_1.FindProjectById(projectId);
    // 如果请求的Method不符合设定
    if (!foundMock) {
        return ctx.body = dataHandle_1.error('请求参数错误,请重试');
    }
    let result = undefined;
    // 确定项目转发状态,
    // 如果是平台mock,返回 匹配的数据
    // 如果是接口转发,那么在转发地址上加上指定的接口名
    if (foundProject.status === 'mock') {
        // 模拟数据
        Mock.Handler.function = function (options) {
            options.Mock = Mock;
            // 传入 request cookies，方便使用
            options._req = ctx.request;
            return options.template.call(options.context.currentContext, options);
        };
        const temp = JSON.stringify(foundMock.mode);
        const vm = new VM({
            timeout: 1000,
            sandbox: {
                Mock: Mock,
                mode: foundMock.mode,
                template: new Function(`return ${foundMock.mode}`)
            }
        });
        vm.run('Mock.mock(new Function("return " + mode)())'); // 数据验证，检测 setTimeout 等方法, 顺便将内部的函数执行了
        const apiData = vm.run('Mock.mock(template())');
        console.log('apiData:', apiData);
        result = dataHandle_1.mockSuccess(apiData);
    }
    else if (foundProject.status === 'transfer') {
        // 如果代理成自己,会造成无限循环，因此一开始就判断然后拒绝代理
        if (foundProject.transferUrl.indexOf(projectId) > -1 && mockURL.replace('/', '') === foundMock.url) {
            return ctx.body = dataHandle_1.error('接口无法转发自身!');
        }
        else {
            result = yield exports.getRemoteData(foundMock.method, foundProject.transferUrl + '/' + foundMock.url, query, body);
            console.log('final result:', result);
            if (result === '') {
                ctx.body = {
                    'state': {
                        'code': 500,
                        'msg': '转发请求出错,请检查转发服务是否正常!'
                    },
                    'data': undefined
                };
                return;
            }
        }
    }
    return ctx.body = result;
});
//# sourceMappingURL=mock.js.map