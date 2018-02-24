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
const Message = require('../models/message');
exports.FindMessageById = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log('正在查找Id:');
    return Message.findOne({ _id: id });
});
exports.AllMessages = () => __awaiter(this, void 0, void 0, function* () {
    const data = [
        {
            _id: 'message001',
            time: '2017-12-09  21:54:46',
            operatorId: 'user001',
            operatorName: '小二',
            action: 'add',
            projectId: 'project001',
            objectId: 'project001',
            objectName: '项目',
            desc: '新增项目: xxx',
            userId: 'test001',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'normal',
            readed: false
        },
        {
            _id: 'message002',
            time: '2017-12-09  21:54:46',
            operatorId: 'user001',
            operatorName: '小二',
            action: 'update',
            projectId: 'project001',
            objectId: 'project001',
            objectName: '项目',
            desc: '更新项目: xxx',
            userId: 'test001',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'normal',
            readed: false
        },
        {
            _id: 'message003',
            time: '2016-12-09  21:54:46',
            operatorId: 'user001',
            operatorName: '小二',
            action: 'delete',
            projectId: 'project001',
            objectId: 'project001',
            objectName: '项目',
            desc: '删除项目: xxx',
            userId: 'test001',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'normal',
            readed: false
        },
        {
            _id: 'message004',
            time: '2018-12-09  21:54:46',
            operatorId: 'user001',
            operatorName: '小二',
            action: 'invite',
            projectId: 'project001',
            objectId: 'user001',
            objectName: '哈哈哈',
            desc: '邀请 哈哈哈 加入 项目团队 Wmock项目',
            userId: 'test001',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'team',
            readed: false
        },
        {
            _id: 'message005',
            time: '2017-12-07  21:54:46',
            operatorId: 'user001',
            operatorName: '小二',
            action: 'apply',
            projectId: 'project002',
            objectId: '',
            objectName: '',
            desc: '小二 申请 加入 项目团队 Wmock项目',
            userId: 'test001',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            type: 'team',
            readed: false
        }
    ];
    // 暂时返回所有的,实际需要过滤与用户相关的
    return Message.findOne({});
});
exports.AddMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    const newMessage = new Message(message);
    return newMessage.save();
});
exports.UpdateMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    return Message.update({
        _id: message._id
    }, {
        $set: {
            readed: message.readed,
        }
    });
});
//# sourceMappingURL=messages.js.map