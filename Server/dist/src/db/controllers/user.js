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
const User = require('../models/user.js');
exports.AddRegUser = (user) => __awaiter(this, void 0, void 0, function* () {
    console.log(user);
    const { username, password, email, role } = user;
    const newUser = new User({ username, password, email, role });
    let hadUser = '';
    const result = {
        status: '',
        userid: '',
        username: '',
        msg: '',
        avatar: '',
        email: '',
        role: '',
        regDate: undefined
    };
    // 先对用户名进行重复校验
    hadUser = yield User.findOne({ 'username': username }, (err, data) => {
        return data;
    });
    if (hadUser && hadUser.username === username) {
        result.msg = '用户名不能重复';
        result.status = 'error';
        return result;
    }
    else {
        console.log('添加用户成功');
        yield newUser.save().then((data) => {
            console.log('保存后的信息为:');
            console.log(data);
            result.msg = '用户注册成功!';
            result.status = 'success';
            result.userid = data._id;
            result.username = data.username;
            result.avatar = data.avatar;
            result.email = data.email;
            result.regDate = data.regDate;
            result.role = data.role;
            console.log(result);
        });
        return result;
    }
});
exports.LoginUser = (user) => __awaiter(this, void 0, void 0, function* () {
    const { username, password } = user;
    console.log('用户正在登录:');
    console.log(user);
    return User.findOne({ 'username': username });
});
exports.FindUserById = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log('正在查找Id:');
    return User.findOne({ _id: id });
});
//# sourceMappingURL=user.js.map