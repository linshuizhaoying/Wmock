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
const project_1 = require("./project");
const Message = require("../models/message");
const _ = require("lodash");
exports.FindMessageByProjectId = (id) => __awaiter(this, void 0, void 0, function* () {
    return Message.find({ projectId: id });
});
exports.FindMessageByprojectIdAndObjectId = (projectId, userId) => __awaiter(this, void 0, void 0, function* () {
    return Message.findOne({
        projectId: projectId,
        userId: userId,
        readed: false,
        action: "invite"
    });
});
exports.FindMessageByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
    return Message.findOne({ masterId: id });
});
exports.FindMessageById = (id) => __awaiter(this, void 0, void 0, function* () {
    return Message.findOne({ _id: id });
});
exports.FindMessageByObjectId = (objectId) => __awaiter(this, void 0, void 0, function* () {
    return Message.find({ objectId: objectId, type: "normal" });
});
exports.AllMessages = (userId) => __awaiter(this, void 0, void 0, function* () {
    const projectMap = yield project_1.FindProjectListByUserId(userId);
    console.log("projectList", projectMap);
    const result = [];
    // 找到项目相关的信息
    for (const projectId in projectMap) {
        const projectList = yield exports.FindMessageByProjectId(projectId);
        projectList.map((item) => __awaiter(this, void 0, void 0, function* () {
            result.push(item);
        }));
    }
    // 找到操作对象相关的信息
    const objectMessages = yield exports.FindMessageByObjectId(userId);
    objectMessages.map((message) => {
        result.push(message);
    });
    return yield _.uniqBy(result, "_id");
});
exports.AddMessage = (message) => __awaiter(this, void 0, void 0, function* () {
    console.log("message", message);
    const newMessage = new Message(message);
    let result;
    yield newMessage
        .save((error) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            result = error.toString();
        }
    }))
        .then((message) => __awaiter(this, void 0, void 0, function* () {
        result = message._id;
    }));
    return result;
});
exports.UpdateMessageReaded = (message) => __awaiter(this, void 0, void 0, function* () {
    return yield Message.update({
        _id: message._id
    }, {
        $set: {
            readed: message.readed
        }
    });
});
//# sourceMappingURL=messages.js.map