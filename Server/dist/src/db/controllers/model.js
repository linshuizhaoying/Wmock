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
// 基础模型列表
exports.BaseModelList = () => __awaiter(this, void 0, void 0, function* () {
    console.log('base');
    const data = [{
            modelName: '字符串',
            modelMode: '"string|1-10": "$"'
        },
        {
            modelName: '数字',
            modelMode: '"number|1-100": 100'
        },
    ];
    return yield data;
});
// 自定义模型列表
exports.CustomModelList = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log(id);
    const data = [{
            _id: 'model001',
            modelName: 'Wmock - User模型',
            modelDesc: 'Wmock项目的User模型',
            modelMode: '{ "function": function() {return 233}}',
            userId: 'user001',
            userName: '2333'
        },
        {
            _id: 'model002',
            modelName: 'Wmock - Mock模型',
            modelDesc: 'Wmock项目的Mock模型',
            modelMode: '{ "function": function() {return 666}}',
            userId: 'user002',
            userName: '666'
        }
    ];
    return yield data;
});
//# sourceMappingURL=model.js.map