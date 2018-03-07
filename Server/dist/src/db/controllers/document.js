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
const Document = require('../models/document');
exports.AllDocument = () => __awaiter(this, void 0, void 0, function* () {
    return yield Document.find();
});
exports.AddDocument = (originDocument) => __awaiter(this, void 0, void 0, function* () {
    const newDocument = new Document(originDocument);
    let result;
    yield newDocument.save((error) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            result = error.toString();
        }
    })).then((document) => __awaiter(this, void 0, void 0, function* () {
        result = document._id;
    }));
    return result;
});
exports.UpdateDocument = (document) => __awaiter(this, void 0, void 0, function* () {
    return yield Document.update({
        _id: document._id
    }, {
        $set: {
            content: document.content,
            desc: document.desc,
            name: document.name,
            ownerId: document.ownerId,
            ownerName: document.ownerName,
            assign: document.assign,
            type: document.type,
        }
    });
});
exports.RemoveDocument = (id) => __awaiter(this, void 0, void 0, function* () {
    return Document.remove({
        _id: id
    });
});
//# sourceMappingURL=document.js.map