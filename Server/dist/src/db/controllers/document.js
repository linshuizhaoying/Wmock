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
exports.AllDocument = () => __awaiter(this, void 0, void 0, function* () {
    const data = [{
            _id: 'document001',
            name: '前端编码规范',
            type: 'spec',
            ownerId: 'user001',
            ownerName: '001',
            assign: ['project001'],
            content: '<p>2333<h1>666</h1></p>',
            desc: '2018年全新前端编码规范'
        },
        {
            _id: 'document002',
            name: '后端编码规范',
            type: 'project',
            ownerId: 'user002',
            ownerName: '噢噢001',
            assign: ['project001', 'project002'],
            content: '<p>后端规范<h2>666</h2></p>',
            desc: '2018年后端编码规范'
        }
    ];
    return yield data;
});
//# sourceMappingURL=document.js.map