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
const News = require('../models/news');
function GetDateStr(AddDayCount) {
    const dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1; // 获取当前月份的日期
    const d = dd.getDate();
    return y + '-' + m + '-' + d;
}
exports.ExistNews = () => __awaiter(this, void 0, void 0, function* () {
    const start = new Date(GetDateStr(-7)); // 过去 七天
    const end = new Date(GetDateStr(1)); // 明天 0点
    // console.log(start);
    // console.log(end);
    return yield News.find({ 'CreateDate': { '$gte': start, '$lt': end } }).sort({ CreateDate: -1 });
});
exports.HoursNews = () => __awaiter(this, void 0, void 0, function* () {
    const start = new Date(GetDateStr(0)); // 今天 0点
    const end = new Date(GetDateStr(1)); // 明天 0点
    // console.log(start);
    // console.log(end);
    return yield News.find({ 'CreateDate': { '$gte': start, '$lt': end } }).sort({ CreateDate: -1 });
});
exports.WeeksNews = () => __awaiter(this, void 0, void 0, function* () {
    const start = new Date(GetDateStr(-7)); // 一个星期前
    const end = new Date(GetDateStr(0)); // 明天 0点
    console.log(start);
    console.log(end);
    return yield News.find({ 'CreateDate': { '$gte': start, '$lt': end } }).sort({ CreateDate: -1 });
});
exports.MouthsNews = () => __awaiter(this, void 0, void 0, function* () {
    const start = new Date(GetDateStr(-31)); // 一个月前
    const end = new Date(GetDateStr(-7)); // 明天 0点
    console.log(start);
    console.log(end);
    return yield News.find({ 'CreateDate': { '$gte': start, '$lt': end } }).sort({ CreateDate: -1 });
});
exports.saveToNews = (item) => __awaiter(this, void 0, void 0, function* () {
    const { title, enTitle, url, sourceTitle, sourceLink, type, tagList, read, score } = item;
    const duplicate = { 'title': title };
    News.findOneAndUpdate(duplicate, Object.assign({}, item), { upsert: true, new: false }, (err, doc) => {
        // console.log('无重复插入成功!')
    });
});
exports.AllNews = () => __awaiter(this, void 0, void 0, function* () {
    return yield News.find({});
});
//# sourceMappingURL=news.js.map