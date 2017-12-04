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
const axios_1 = require("axios");
const cheerio = require('cheerio');
const tjs = require("translation.js");
const translate = (str) => __awaiter(this, void 0, void 0, function* () {
    let data = '';
    yield tjs.translate({
        text: str.toLowerCase(),
        from: 'en',
        to: 'zh-CN'
    }).then((result) => __awaiter(this, void 0, void 0, function* () {
        data = yield result.result.toString();
    })).catch(err => {
        console.log(err);
    });
    return data;
});
exports.onlineTest = (ctx) => __awaiter(this, void 0, void 0, function* () {
    let _body = '';
    const result = [];
    let node = '';
    console.log(ctx.request.body);
    const { source, parent, child, sourceLink, lang } = ctx.request.body;
    // 如果有代码片段传过来,说明是测试存在的代码源
    if (ctx.request.body.code) {
        node = ctx.request.body.code;
    }
    else {
        node = parent + ' ' + child;
    }
    console.log(node);
    yield axios_1.default({ method: 'get', url: decodeURIComponent(sourceLink), responseType: 'text' })
        .then(function (response) {
        _body = response.data;
    });
    let strArr = '';
    const $ = cheerio.load(_body); // 获取文本
    $(node).map((index, element) => __awaiter(this, void 0, void 0, function* () {
        const item = {
            title: '',
            enTitle: '',
            link: sourceLink,
            source: source,
            sourceLink: sourceLink,
            type: 'spider'
        };
        const ele = $(element);
        item.title = ele.text().trim();
        item.link = ele.attr('href');
        if (lang === 'en') {
            strArr = strArr + '$$' + item.title;
        }
        result.push(item);
    }));
    const r = yield translate(strArr);
    const arr = r.split('$$');
    // console.log(result)
    result.map((item, key) => {
        item.enTitle = arr[key + 1];
    });
    return ctx.body = JSON.parse(JSON.stringify(result));
});
//# sourceMappingURL=onlineTest.js.map