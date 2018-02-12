"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 返回正常数据
exports.success = (data, msg) => {
    return {
        'state': {
            'code': 1,
            'msg': msg
        },
        'data': {
            data
        }
    };
};
// 返回错误提醒
exports.error = (msg) => {
    return {
        'state': {
            'code': 2,
            'msg': msg
        }
    };
};
//# sourceMappingURL=dataHandle.js.map