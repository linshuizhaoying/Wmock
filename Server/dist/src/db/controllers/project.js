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
const Project = require('../models/project');
exports.DemoProject = (userId) => __awaiter(this, void 0, void 0, function* () {
    return yield Project.find({ masterId: userId, type: 'demo' });
    // const data = [
    //   {
    //     _id: 'project001',
    //     projectName: '演示项目 - REST接口示例超长字符串测试asd123',
    //     projectUrl: '/project001',
    //     projectDesc: '项目描述',
    //     version: 'v1.0',
    //     transferUrl: 'http://haoqiao.me/api/project',
    //     status: 'transfer',
    //     type: 'demo',
    //     teamMember: [
    //       {
    //         _id: 'user001',
    //         userName: '2333',
    //         role: '前端工程师',
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    //       },
    //       {
    //         _id: 'user002',
    //         userName: '宋青树',
    //         role: '后端工程师',
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    //       },
    //     ],
    //     interfaceList: [
    //       {
    //         _id: 'interface001',
    //         interfaceName: '获取',
    //         url: '/getAll',
    //         method: 'get',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       },
    //       {
    //         _id: 'interface002',
    //         interfaceName: '增加',
    //         url: '/add',
    //         method: 'post',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       },
    //       {
    //         _id: 'interface003',
    //         interfaceName: '删除',
    //         url: '/delete',
    //         method: 'delete',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       },
    //       {
    //         _id: 'interface004',
    //         interfaceName: '更新',
    //         url: '/update',
    //         method: 'put',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       }
    //     ]
    //   },
    //   {
    //     _id: 'project002',
    //     projectName: '演示项目 - 基本操作示例',
    //     projectUrl: '/project002',
    //     projectDesc: '项目描述',
    //     version: 'v2.0',
    //     transferUrl: 'http://haoqiao.me/api/project',
    //     status: 'mock',
    //     type: 'demo',
    //     teamMember: [
    //       {
    //         _id: 'user001',
    //         userName: '2333',
    //         role: '前端工程师',
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    //       },
    //       {
    //         _id: 'user002',
    //         userName: '妮妮',
    //         role: '前端工程师',
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    //       },
    //       {
    //         _id: 'user003',
    //         userName: '苏苏',
    //         role: '后端工程师',
    //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    //       },
    //     ],
    //     interfaceList: [
    //       {
    //         _id: 'interface005',
    //         interfaceName: '注册',
    //         url: '/reg',
    //         method: 'post',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       },
    //       {
    //         _id: 'interface006',
    //         interfaceName: '登录',
    //         url: '/login',
    //         method: 'post',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       },
    //       {
    //         _id: 'interface007',
    //         interfaceName: 'token',
    //         url: '/token',
    //         method: 'post',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       },
    //       {
    //         _id: 'interface008',
    //         interfaceName: '退出',
    //         url: '/logout',
    //         method: 'post',
    //         desc: '接口描述',
    //         mode: '{data: 1 || 2}'
    //       }
    //     ]
    //   }
    // ]
    // return await data
});
exports.UserProject = (userName) => __awaiter(this, void 0, void 0, function* () {
    console.log(userName);
    const data = [
        {
            _id: 'project003',
            projectName: 'REST接口示例超长字符串测试asd123',
            projectUrl: '/project003',
            projectDesc: '项目描述',
            version: 'v1.0',
            transferUrl: 'http://haoqiao.me/api/project',
            status: 'transfer',
            type: 'user',
            teamMember: [
                {
                    _id: 'user001',
                    userName: '2333',
                    role: '前端工程师',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                },
                {
                    _id: 'user002',
                    userName: '宋青树',
                    role: '后端工程师',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                },
            ],
            interfaceList: [
                {
                    _id: 'interface001',
                    interfaceName: '获取',
                    url: '/getAll',
                    method: 'get',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                },
                {
                    _id: 'interface002',
                    interfaceName: '增加',
                    url: '/add',
                    method: 'post',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                },
                {
                    _id: 'interface003',
                    interfaceName: '删除',
                    url: '/delete',
                    method: 'delete',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                },
                {
                    _id: 'interface004',
                    interfaceName: '更新',
                    url: '/update',
                    method: 'put',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                }
            ]
        },
        {
            _id: 'project004',
            projectName: '基本操作示例',
            projectUrl: '/project004',
            projectDesc: '项目描述',
            version: 'v2.0',
            transferUrl: 'http://haoqiao.me/api/project',
            status: 'mock',
            type: 'user',
            teamMember: [
                {
                    _id: 'user001',
                    userName: '2333',
                    role: '前端工程师',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                },
                {
                    _id: 'user002',
                    userName: '妮妮',
                    role: '前端工程师',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                },
                {
                    _id: 'user003',
                    userName: '苏苏',
                    role: '后端工程师',
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                },
            ],
            interfaceList: [
                {
                    _id: 'interface005',
                    interfaceName: '注册',
                    url: '/reg',
                    method: 'post',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                },
                {
                    _id: 'interface006',
                    interfaceName: '登录',
                    url: '/login',
                    method: 'post',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                },
                {
                    _id: 'interface007',
                    interfaceName: 'token',
                    url: '/token',
                    method: 'post',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                },
                {
                    _id: 'interface008',
                    interfaceName: '退出',
                    url: '/logout',
                    method: 'post',
                    desc: '接口描述',
                    mode: '{data: 1 || 2}'
                }
            ]
        }
    ];
    return yield data;
});
exports.UnJoinProjectList = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log(id);
    const data = [
        {
            projectId: 'proejct110',
            projectName: '尚未加入的项目001',
        },
        {
            projectId: 'proejct111',
            projectName: '尚未加入的项目002',
        },
        {
            projectId: 'proejct112',
            projectName: '尚未加入的项目003',
        }
    ];
    return yield data;
});
exports.AddProject = (project) => __awaiter(this, void 0, void 0, function* () {
    const newProject = new Project(project);
    let result;
    yield newProject.save((error) => {
        if (error) {
            result = error.toString();
        }
    }).then((project) => {
        result = project._id;
    });
    return result;
});
exports.UpdateProject = (project) => __awaiter(this, void 0, void 0, function* () {
});
exports.RemoveProject = (id) => __awaiter(this, void 0, void 0, function* () {
});
//# sourceMappingURL=project.js.map