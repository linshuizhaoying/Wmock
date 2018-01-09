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
exports.AllProject = (username) => __awaiter(this, void 0, void 0, function* () {
    if (username === 'demo') {
        const data = [
            {
                _id: 'project001',
                projectName: 'REST接口示例超长字符串测试asd123',
                projectUrl: '/project001',
                projectDesc: '项目描述',
                version: 'v1.0',
                teamMember: [
                    {
                        _id: 'user001',
                        avatar: '/xx.jpg'
                    },
                    {
                        _id: 'user002',
                        avatar: '/xx2.jpg'
                    },
                ],
                interfaceList: [
                    {
                        _id: 'interface001',
                        interfaceName: '获取',
                        interfaceUrl: '/getAll',
                        method: 'get',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    },
                    {
                        _id: 'interface002',
                        interfaceName: '增加',
                        interfaceUrl: '/add',
                        method: 'post',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    },
                    {
                        _id: 'interface003',
                        interfaceName: '删除',
                        interfaceUrl: '/delete',
                        method: 'post',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    },
                    {
                        _id: 'interface004',
                        interfaceName: '更新',
                        interfaceUrl: '/update',
                        method: 'post',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    }
                ]
            },
            {
                _id: 'project002',
                projectName: '基本操作示例',
                projectUrl: '/project002',
                projectDesc: '项目描述',
                version: 'v1.0',
                teamMember: [
                    {
                        _id: 'user001',
                        avatar: '/xx.jpg'
                    },
                    {
                        _id: 'user002',
                        avatar: '/xx2.jpg'
                    },
                    {
                        _id: 'user003',
                        avatar: '/xx3.jpg'
                    },
                ],
                interfaceList: [
                    {
                        _id: 'interface005',
                        interfaceName: '注册',
                        interfaceUrl: '/reg',
                        method: 'reg',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    },
                    {
                        _id: 'interface006',
                        interfaceName: '登录',
                        interfaceUrl: '/login',
                        method: 'post',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    },
                    {
                        _id: 'interface007',
                        interfaceName: 'token',
                        interfaceUrl: '/token',
                        method: 'post',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    },
                    {
                        _id: 'interface008',
                        interfaceName: '退出',
                        interfaceUrl: '/logout',
                        method: 'post',
                        interfaceDesc: '接口描述',
                        mode: '{data: 1 || 2}'
                    }
                ]
            }
        ];
        return yield data;
    }
    else {
        const data = [username, '2333'];
        return yield data;
    }
});
//# sourceMappingURL=project.js.map