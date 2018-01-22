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
            _id: 'message001',
            time: '2017-12-09  21:54:46',
            operator_id: 'user001',
            operator_name: '小二',
            action: 'add',
            project_id: 'project001',
            object_id: 'project001',
            object_name: '项目',
            desc: '新增项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'normal',
            readed: false
        },
        {
            _id: 'message002',
            time: '2017-12-09  21:54:46',
            operator_id: 'user001',
            operator_name: '小二',
            action: 'update',
            project_id: 'project001',
            object_id: 'project001',
            object_name: '项目',
            desc: '更新项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'normal',
            readed: false
        },
        {
            _id: 'message003',
            time: '2016-12-09  21:54:46',
            operator_id: 'user001',
            operator_name: '小二',
            action: 'delete',
            project_id: 'project001',
            object_id: 'project001',
            object_name: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'normal',
            readed: false
        },
        {
            _id: 'message004',
            time: '2018-12-09  21:54:46',
            operator_id: 'user001',
            operator_name: '小二',
            action: 'invite',
            project_id: 'project001',
            object_id: 'user001',
            object_name: '哈哈哈',
            desc: '邀请 哈哈哈 加入团队',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'team',
            readed: false
        },
        {
            _id: 'message005',
            time: '2017-12-07  21:54:46',
            operator_id: 'user001',
            operator_name: '小二',
            action: 'apply',
            project_id: 'project002',
            object_id: '',
            object_name: '',
            desc: '小二 申请 加入团队',
            userId: 'test001',
            Avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'team',
            readed: false
        }
    ];
    return yield data;
});
//# sourceMappingURL=messages.js.map