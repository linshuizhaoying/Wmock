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
const User = require("../models/user");
const md5 = require('md5');
exports.FindUserById = (id) => __awaiter(this, void 0, void 0, function* () {
    // console.log("正在查找Id:");
    return yield User.findOne({ _id: id });
});
exports.FindUserByName = (userName) => __awaiter(this, void 0, void 0, function* () {
    return yield User.findOne({ userName: userName });
});
exports.FindUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
    return yield User.findOne({ email: email });
});
exports.AddRegUser = (user) => __awaiter(this, void 0, void 0, function* () {
    // console.log(user);
    const { userName, passWord, email, role } = user;
    const newUser = new User({ userName, passWord, email, role });
    // let hadUser: any = ''
    const result = {
        status: "",
        userId: "",
        userName: "",
        msg: "",
        avatar: "",
        email: "",
        role: "",
        regDate: undefined
    };
    yield newUser.save().then((data) => {
        // console.log("保存后的信息为:");
        // console.log(data);
        result.msg = "用户注册成功!";
        result.status = "success";
        result.userId = data._id;
        result.userName = data.userName;
        result.avatar = data.avatar;
        result.email = data.email;
        result.regDate = data.regDate;
        result.role = data.role;
        // console.log(result);
    });
    return result;
});
exports.LoginUser = (user) => __awaiter(this, void 0, void 0, function* () {
    const { userName, passWord } = user;
    // console.log("用户正在登录:");
    // console.log(user);
    return User.findOne({ userName: userName });
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
exports.initAdmin = () => __awaiter(this, void 0, void 0, function* () {
    const exist = yield exports.FindUserByName("admin");
    if (!exist) {
        const user = {
            userName: "admin",
            passWord: md5("admin888"),
            email: "admin@wmock.com",
            role: "admin"
        };
        yield exports.AddRegUser(user);
    }
});
//# sourceMappingURL=user.js.map