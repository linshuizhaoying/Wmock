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
const Interface = require('../models/interface');
exports.FindInterfaceListById = (interfaceId) => __awaiter(this, void 0, void 0, function* () {
    return yield Interface.find({ _id: interfaceId });
});
exports.FindInterfaceById = (interfaceId) => __awaiter(this, void 0, void 0, function* () {
    return yield Interface.findOne({ _id: interfaceId });
});
exports.FindInterfaceByMock = (projectId, url, method) => __awaiter(this, void 0, void 0, function* () {
    return yield Interface.findOne({ projectId: projectId, url: url, method: method });
});
// 获取项目Id相同的接口
exports.InterfaceList = (projectId) => __awaiter(this, void 0, void 0, function* () {
    return yield Interface.find({ projectId: projectId });
});
exports.CheckInterfaceExist = (projectId, url, method) => __awaiter(this, void 0, void 0, function* () {
    let result;
    yield Interface.findOne({
        projectId: projectId,
        url: url,
        method: method
    }).then((data) => {
        console.log(data);
        result = data;
    });
    return result;
});
exports.AddInterface = (interfaceItem) => __awaiter(this, void 0, void 0, function* () {
    const newInterface = new Interface(interfaceItem);
    let result;
    yield newInterface.save((error) => {
        if (error) {
            result = error.toString();
        }
    }).then((interfaceOne) => {
        result = interfaceOne._id;
    });
    return result;
});
exports.RemoveInterface = (interfaceId) => __awaiter(this, void 0, void 0, function* () {
    return Interface.remove({
        _id: interfaceId
    });
});
exports.UpdateInterface = (interfaceItem) => __awaiter(this, void 0, void 0, function* () {
    return Interface.update({
        _id: interfaceItem._id
    }, {
        $set: {
            desc: interfaceItem.desc,
            url: interfaceItem.url,
            method: interfaceItem.method,
            mode: interfaceItem.mode,
            interfaceName: interfaceItem.interfaceName
        }
    });
});
//# sourceMappingURL=interface.js.map