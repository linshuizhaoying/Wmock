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
exports.UpdateMessageReaded = (message) => __awaiter(this, void 0, void 0, function* () {
    return yield Message.update({
        _id: message._id
    }, {
        $set: {
            readed: message.readed,
        }
    });
});
//# sourceMappingURL=messages.js.map