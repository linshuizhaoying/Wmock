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
const project_1 = require("./project");
exports.FindMessageByProjectId = (id) => __awaiter(this, void 0, void 0, function* () {
    return Message.find({ projectId: id });
});
exports.FindMessageByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
    return Message.findOne({ masterId: id });
});
exports.FindMessageById = (id) => __awaiter(this, void 0, void 0, function* () {
    return Message.findOne({ _id: id });
});
exports.AllMessages = (userId) => __awaiter(this, void 0, void 0, function* () {
    const projectMap = yield project_1.FindProjectListByUserId(userId);
    console.log('projectList', projectMap);
    const result = [];
    for (const projectId in projectMap) {
        const projectList = yield exports.FindMessageByProjectId(projectId);
        projectList.map((item) => __awaiter(this, void 0, void 0, function* () {
            result.push(item);
        }));
    }
    return result;
    // const data = [
    //   {
    //     _id: 'message001',
    //     time: '2017-12-09  21:54:46',
    //     operatorId: 'user001',
    //     operatorName: '小二',
    //     action: 'add', // add update delete invite apply
    //     projectId: 'project001',
    //     objectId: 'project001',
    //     objectName: '项目',
    //     desc: '新增项目: xxx',
    //     userId: 'test001',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     type: 'normal',  // nomarl || team
    //     readed: false
    //   },
    //   {
    //     _id: 'message002',
    //     time: '2017-12-09  21:54:46',
    //     operatorId: 'user001',
    //     operatorName: '小二',
    //     action: 'update', // add update delete invite apply
    //     projectId: 'project001',
    //     objectId: 'project001',
    //     objectName: '项目',
    //     desc: '更新项目: xxx',
    //     userId: 'test001',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     type: 'normal',  // nomarl || team
    //     readed: false
    //   },
    //   {
    //     _id: 'message003',
    //     time: '2016-12-09  21:54:46',
    //     operatorId: 'user001',
    //     operatorName: '小二',
    //     action: 'delete', // add update delete invite apply
    //     projectId: 'project001',
    //     objectId: 'project001',
    //     objectName: '项目',
    //     desc: '删除项目: xxx',
    //     userId: 'test001',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     type: 'normal',  // nomarl || team
    //     readed: false
    //   },
    //   {
    //     _id: 'message004',
    //     time: '2018-12-09  21:54:46',
    //     operatorId: 'user001',
    //     operatorName: '小二',
    //     action: 'invite', // add update delete invite apply
    //     projectId: 'project001',
    //     objectId: 'user001',
    //     objectName: '哈哈哈',
    //     desc: '邀请 哈哈哈 加入 项目团队 Wmock项目',
    //     userId: 'test001',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     type: 'team',  // nomarl || team
    //     readed: false
    //   },
    //   {
    //     _id: 'message005',
    //     time: '2017-12-07  21:54:46',
    //     operatorId: 'user001',
    //     operatorName: '小二',
    //     action: 'apply', // add update delete invite apply
    //     projectId: 'project002',
    //     objectId: '',
    //     objectName: '',
    //     desc: '小二 申请 加入 项目团队 Wmock项目',
    //     userId: 'test001',
    //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    //     type: 'team',  // nomarl || team
    //     readed: false
    //   }
    // ]
    // 暂时返回所有的,实际需要过滤与用户相关的
    // return Message.findOne({})
});
exports.AddMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    console.log('message', message);
    const newMessage = new Message(message);
    let result;
    yield newMessage.save((error) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            result = error.toString();
        }
    })).then((message) => __awaiter(this, void 0, void 0, function* () {
        result = message._id;
    }));
    return result;
});
exports.UpdateMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    return yield Message.update({
        _id: message._id
    }, {
        $set: {
            readed: message.readed,
        }
    });
});
//# sourceMappingURL=messages.js.map