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
const frame_1 = require("../utils/frame");
exports.requestFrame = (ctx) => __awaiter(this, void 0, void 0, function* () {
    let _body = '';
    console.log(ctx.params.link);
    yield axios_1.default({
        method: 'get',
        url: decodeURIComponent(ctx.params.link),
        responseType: 'text'
    }).then(function (response) {
        _body = response.data;
        _body += '<script>' + frame_1.default + '</script>';
    });
    return ctx.body = _body;
});
//# sourceMappingURL=adminApi.js.map