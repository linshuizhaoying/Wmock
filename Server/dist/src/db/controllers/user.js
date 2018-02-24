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
const User = require('../models/user');
exports.AddRegUser = (user) => __awaiter(this, void 0, void 0, function* () {
    console.log(user);
    const { userName, passWord, email, role } = user;
    const newUser = new User({ userName, passWord, email, role });
    let hadUser = '';
    const result = {
        status: '',
        userId: '',
        userName: '',
        msg: '',
        avatar: '',
        email: '',
        role: '',
        regDate: undefined
    };
    // 先对用户名进行重复校验
    hadUser = yield User.findOne({ 'userName': userName }, (err, data) => {
        return data;
    });
    if (hadUser && hadUser.userName === userName) {
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
            result.userId = data._id;
            result.userName = data.userName;
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
    const { userName, passWord } = user;
    console.log('用户正在登录:');
    console.log(user);
    return User.findOne({ 'userName': userName });
});
exports.FindUserById = (id) => __awaiter(this, void 0, void 0, function* () {
    console.log('正在查找Id:');
    return User.findOne({ _id: id });
});
exports.UpdateUser = (user) => __awaiter(this, void 0, void 0, function* () {
    return User.update({
        _id: user._id
    }, {
        $set: {
            userName: user.userName,
            passWord: user.passWord,
            avatar: user.avatar,
            role: user.role,
            email: user.email
        }
    });
});
//# sourceMappingURL=user.js.map