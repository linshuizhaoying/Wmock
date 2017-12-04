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
const tjs = require("translation.js");
const axios_1 = require("axios");
const index_1 = require("../../db/controllers/index");
const news_1 = require("../../db/controllers/news");
const tag_1 = require("../../db/controllers/tag");
const schedule = require("node-schedule");
const _ = require("lodash");
const cheerio = require('cheerio');
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
const config = {
    interval: 120,
    use_redis: false,
    error_try: true,
};
// 设置定时爬取任务
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6, 7];
rule.hour = Array.from(new Set(Array.from(new Array(Math.ceil(24 / (config.interval / 60))), (val, index) => Math.ceil(index * config.interval / 60) % 24)));
rule.minute = 30;
console.log(rule);
schedule.scheduleJob(rule, function () {
    exports.spiderInitial();
    console.log('任务正在执行中...' + 'hour');
});
let dataQueueList = []; // 从数据库中获取咨询源加入队列
let tagList = []; // 从数据库中获取标签列表
const errorQueueList = []; // 爬取失败的咨询源队列
const todaySpiderResult = [];
let todaySpiderNum = 0;
const getTagList = () => __awaiter(this, void 0, void 0, function* () {
    const temp = yield tag_1.AllTags();
    let result = [];
    const final = [];
    result = temp.filter((item) => { return item.status === '活跃'; });
    result.forEach((item) => { final.push(item.tagTitle); });
    return final;
});
const getSourceList = () => __awaiter(this, void 0, void 0, function* () {
    const result = yield index_1.AllSources();
    return result;
});
exports.spiderInitial = () => __awaiter(this, void 0, void 0, function* () {
    console.log('爬虫初始化');
    dataQueueList = yield getSourceList();
    tagList = yield getTagList();
    console.log('获取咨询源列表');
    console.log(dataQueueList);
    console.log('分批爬取ing...');
    const promises = [];
    dataQueueList.forEach((item, index) => __awaiter(this, void 0, void 0, function* () {
        promises.push(new Promise(function (resolve, reject) {
            const { sourceTitle, url, lang, code, type } = item;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                yield spiderSingleUrl({ sourceTitle, url, lang, code, type }, index);
                resolve();
            }), 0);
        }));
    }));
    Promise.all(promises).then(() => __awaiter(this, void 0, void 0, function* () {
        console.log('今日爬取数量:');
        console.log(todaySpiderNum);
        yield insertTodayNews(todaySpiderResult);
        console.log('爬取失败资源数量:');
        console.log(errorQueueList.length);
        errorQueueList.forEach((item) => {
            console.log(item.url + ' 爬取失败');
        });
    }));
});
function compare(a, b) {
    return a.title === b.title;
}
const insertTodayNews = (array) => __awaiter(this, void 0, void 0, function* () {
    const temp = {
        title: '',
        enTitle: '',
        url: '',
        sourceTitle: '',
        sourceLink: '',
        type: '',
        tagList: '',
        read: 0,
        score: 0,
    };
    const existNews = yield news_1.ExistNews();
    const flattenArr = yield _.flattenDeep(array);
    console.log(existNews.length);
    console.log(flattenArr.length);
    const result = _.differenceWith(flattenArr, existNews, compare);
    console.log(result);
    result.forEach((item) => __awaiter(this, void 0, void 0, function* () {
        const ok = Object.assign(temp, item);
        console.log('正在插入:');
        console.log(ok);
        yield news_1.saveToNews(ok);
    }));
    // array.forEach( async (arr: any[]) => {
    //   arr.forEach( async (item: any) => {
    //     // let flag = true
    //     // existNews.forEach(async (oldItem: any) => {
    //     //    if (oldItem.title.trim() == item.title.trim()) {
    //     //      flag = false
    //     //      console.log('咨询已存在')
    //     //    }
    //     // });
    //     // if ( !flag ) {
    //     //   console.log('新资讯:')
    //     //   console.log(item)
    //     // } else {
    //     //   console.log('-1')
    //     // }
    //     //  const result = Object.assign(temp, item)
    //     //  console.log('正在插入:')
    //     //  console.log(result)
    //     //  await saveToNews(result)
    //   })
    // })
});
const spiderSingleUrl = (item, index) => __awaiter(this, void 0, void 0, function* () {
    console.log('正在处理:', item);
    try {
        const { sourceTitle, url, lang, code, type } = item;
        let _body = '';
        const result = [];
        const node = code;
        yield axios_1.default({ method: 'get', url: decodeURIComponent(url), responseType: 'text' })
            .then(function (response) {
            _body = response.data;
        });
        let strArr = '';
        const $ = yield cheerio.load(_body); // 获取文本
        $(node).map((index, element) => __awaiter(this, void 0, void 0, function* () {
            const item = {
                title: '',
                enTitle: '',
                url: '',
                sourceTitle: sourceTitle,
                sourceLink: url,
                type: 'spider',
                tagList: '',
                CreateDate: Date()
            };
            const ele = $(element);
            item.title = ele.text().trim();
            item.url = ele.attr('href');
            // console.log(item)
            if (lang === 'en') {
                strArr = strArr + '$$' + item.title;
            }
            if (item.title.length > 0) {
                result.push(item);
            }
        }));
        const r = yield translate(strArr);
        const arr = r.split('$$');
        // console.log(result)
        result.map((item, key) => {
            item.enTitle = arr[key + 1];
            item.tagList = tagList.filter((tag) => { return item.title.toLowerCase().includes(tag.toLowerCase()); }).toString();
        });
        console.log(result[0]);
        if (result.length > 0) {
            todaySpiderResult.push(result);
            todaySpiderNum += result.length;
        }
        else {
            console.log('爬取出错!');
            errorQueueList.push(item);
        }
        console.log('第' + index + '条咨询源爬取结束');
        return todaySpiderResult;
    }
    catch (e) {
        console.log('爬取出错!');
        errorQueueList.push(item);
        return;
    }
});
//# sourceMappingURL=spiderMan.js.map