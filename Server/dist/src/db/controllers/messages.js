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
exports.AllMessages = () => __awaiter(this, void 0, void 0, function* () {
    const data = [
        {
            time: '2017-12-09  21:54:46',
            operator: '123asd',
            action: '新增',
            object: '项目',
            desc: '新增项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-08  21:54:46',
            operator: '2333',
            action: '删除',
            object: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-07  21:54:46',
            operator: '123asd',
            action: '修改',
            object: '接口',
            desc: '修改接口信息',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-06  21:54:46',
            operator: '123asd',
            action: '新增',
            object: '接口',
            desc: '新增接口: 6666',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-08  21:54:46',
            operator: '2333',
            action: '删除',
            object: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-07  21:54:46',
            operator: '123asd',
            action: '修改',
            object: '接口',
            desc: '修改接口信息',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-06  21:54:46',
            operator: '123asd',
            action: '新增',
            object: '接口',
            desc: '新增接口: 6666',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-08  21:54:46',
            operator: '2333',
            action: '删除',
            object: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-07  21:54:46',
            operator: '123asd',
            action: '修改',
            object: '接口',
            desc: '修改接口信息',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-06  21:54:46',
            operator: '123asd',
            action: '新增',
            object: '接口',
            desc: '新增接口: 6666',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-08  21:54:46',
            operator: '2333',
            action: '删除',
            object: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-07  21:54:46',
            operator: '123asd',
            action: '修改',
            object: '接口',
            desc: '修改接口信息',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project002',
            interfaceId: ''
        },
        {
            time: '2017-12-06  21:54:46',
            operator: '123asd',
            action: '新增',
            object: '接口',
            desc: '新增接口: 6666',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-08  21:54:46',
            operator: '2333',
            action: '删除',
            object: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project002',
            interfaceId: ''
        },
        {
            time: '2017-12-07  21:54:46',
            operator: '123asd',
            action: '修改',
            object: '接口',
            desc: '修改接口信息',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-06  21:54:46',
            operator: '123asd',
            action: '新增',
            object: '接口',
            desc: '新增接口: 6666',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project002',
            interfaceId: ''
        },
        {
            time: '2017-12-08  21:54:46',
            operator: '2333',
            action: '删除',
            object: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project001',
            interfaceId: ''
        },
        {
            time: '2017-12-07  21:54:46',
            operator: '123asd',
            action: '修改',
            object: '接口',
            desc: '修改接口信息',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project002',
            interfaceId: ''
        },
        {
            time: '2017-12-06  21:54:46',
            operator: '123asd',
            action: '新增',
            object: '接口',
            desc: '新增接口: 6666',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            projectId: 'project002',
            interfaceId: ''
        }
    ];
    return yield data;
});
//# sourceMappingURL=messages.js.map