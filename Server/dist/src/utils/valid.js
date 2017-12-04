"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 默认规则
const RULES = {
    numeric: [/^[0-9]*$/, '请填写数字'],
    letters: [/^[a-z]+$/i, "请输入字母"],
    date: [/^\d{4}-\d{2}-\d{2}$/, "请输入有效的日期，格式:yyyy-mm-dd"],
    email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, '请输入有效的邮箱'],
    url: [/^(https?|s?ftp):\/\/\S+$/i, "请输入有效的网址"],
    qq: [/^[1-9]\d{4,}$/, "请输入有效的QQ号"],
    IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请输入正确的身份证号码"],
    phone: [/^(1[0-9]{2})[0-9]{8}$/, "请输入有效的手机号"],
    zipcode: [/^\d{6}$/, "请检查邮政编码格式"],
    username: [/^\w{4,12}$/, "请输入3-12位数字、字母、下划线"],
    password: [/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/, "请输入6-16位字母加数字组合，不能包含空格"],
    required: [function (value) { return !!(value + '').trim(); }]
};
exports.validator = (type, value) => {
};
//# sourceMappingURL=valid.js.map