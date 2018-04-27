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
const Model = require('../models/model');
// 基础模型列表
exports.BaseModelList = () => __awaiter(this, void 0, void 0, function* () {
    // console.log('base')
    const data = [{
            modelDataName: '字符串',
            modelMode: '{"string|1-10": "$"}'
        },
        {
            modelDataName: '数字',
            modelMode: '{"number|1-100": 100}'
        },
        {
            modelDataName: '布尔',
            modelMode: '{"boolean|1-2": true}'
        },
        {
            modelDataName: '对象',
            modelMode: '{"object|2": {"310000": "上海市","320000": "江苏省", "330000": "浙江省", "340000": "安徽省"}}'
        },
        {
            modelDataName: '数组',
            modelMode: '{"array|1-10": [{"name|+1": ["Hello","Mock.js", "!" ]} ]}'
        },
        {
            modelDataName: '函数',
            modelMode: '{"foo": "Syntax Demo","name": function() {return this.foo } }'
        },
        {
            modelDataName: '正则',
            modelMode: '{"regexp": /\d{5,10}/}'
        },
    ];
    return yield data;
});
// 自定义模型列表
exports.CustomModelList = (userId) => __awaiter(this, void 0, void 0, function* () {
    return yield Model.find({ userId: userId });
});
exports.AddModel = (originModel) => __awaiter(this, void 0, void 0, function* () {
    const newModel = new Model(originModel);
    let result;
    yield newModel.save((error) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            result = error.toString();
        }
    })).then((model) => __awaiter(this, void 0, void 0, function* () {
        result = model._id;
    }));
    return result;
});
exports.UpdateModel = (model) => __awaiter(this, void 0, void 0, function* () {
    return yield Model.update({
        _id: model._id
    }, {
        $set: {
            modelDataName: model.modelDataName,
            modelDesc: model.modelDesc,
            modelMode: model.modelMode,
        }
    });
});
exports.RemoveModel = (id) => __awaiter(this, void 0, void 0, function* () {
    return Model.remove({
        _id: id
    });
});
//# sourceMappingURL=model.js.map