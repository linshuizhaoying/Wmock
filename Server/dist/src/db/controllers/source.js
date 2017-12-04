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
const Source = require('../models/source');
exports.AddSource = (source) => __awaiter(this, void 0, void 0, function* () {
    const { sourceTitle, url, lang, type, code } = source;
    const result = new Source({ sourceTitle, url, lang, type, code });
    console.log(result.save(), '添加咨询源成功');
});
exports.RemoveSource = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log(id);
    const result = yield Source.findByIdAndRemove({ _id: id });
    console.log('删除咨询源成功');
});
exports.UpdateSource = (id, source) => __awaiter(this, void 0, void 0, function* () {
    console.log(id);
    console.log(source);
    const result = yield Source.findByIdAndUpdate({ _id: id }, Object.assign({}, source));
    console.log(result);
    console.log('更新咨询源成功');
});
exports.AllSources = () => __awaiter(this, void 0, void 0, function* () {
    return yield Source.find({});
});
//# sourceMappingURL=source.js.map