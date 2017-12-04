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
const Tag = require('../models/tag.js');
exports.AddTag = (tag) => __awaiter(this, void 0, void 0, function* () {
    const { tagTitle, status } = tag;
    const result = new Tag({ tagTitle, status });
    console.log(result.save(), '添加标签成功');
});
exports.UpdateTag = (id, tag) => __awaiter(this, void 0, void 0, function* () {
    const result = yield Tag.findByIdAndUpdate({ _id: id }, Object.assign({}, tag));
    console.log(result);
    console.log('更新标签成功');
});
exports.AllTags = () => __awaiter(this, void 0, void 0, function* () {
    return yield Tag.find({});
});
//# sourceMappingURL=tag.js.map