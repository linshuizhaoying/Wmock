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
const jwt = require("jsonwebtoken");
const controllers_1 = require("../db/controllers");
const dataHandle_1 = require("../utils/dataHandle");
const validator_1 = require("../utils/validator");
const config_1 = require("../config");
const project_1 = require("./project");
const mockEaxmple = require("../utils/mockExample");
/**
 *  用户注册
 *  请求参数
 *  参数名	类型	必填	描述	默认值	参考值
 *  userName	string	是	用户id	-	qianyuhui
 *  passWord	string	是	用户密码,md5加密	-	78e731027d8fd50ed642340b7c9a63b3
 *  email	string	否	用户邮箱	-	4799109@qq.com
 *  返回参数
 *  {
 *    'state': {
 *        'code': 1,
 *        'msg': '注册成功!'
 *    },
 *    'data': {
 *        'userID':'1111',
 *        'userName':'666'
 *    }
 * }
 */
exports.reg = (ctx) => __awaiter(this, void 0, void 0, function* () {
    // console.log(ctx.request.body);
    const { userName, passWord, email, role } = ctx.request.body;
    // 后端先做初步的数据校验和非法字符处理
    if (validator_1.default.userCheck(userName) &&
        validator_1.default.passCheck(passWord) &&
        validator_1.default.emailCheck(email)) {
        // 如果用户改名，需要做用户名重复验证
        const findUserName = yield controllers_1.FindUserByName(userName);
        if (findUserName) {
            return (ctx.body = dataHandle_1.error("该用户名已存在!"));
        }
        // 如果用户修改邮箱，需要做邮箱重复验证
        const findUserEmail = yield controllers_1.FindUserByEmail(email);
        if (findUserEmail) {
            return (ctx.body = dataHandle_1.error("该用邮箱已存在!"));
        }
        const result = yield controllers_1.AddRegUser({ userName, passWord, email, role });
        const token = jwt.sign({
            userId: result.userId,
            userName: userName,
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 天
        }, config_1.config.app.keys);
        // 初始化用户数据
        const initUserProjectData = JSON.parse(mockEaxmple.UserDemoProject);
        initUserProjectData.masterId = result.userId;
        yield project_1.importProjectData(initUserProjectData);
        // 初始化用户前端文档
        const initUserFrontDocumentData = JSON.parse(mockEaxmple.FrontDocumentTemplate);
        initUserFrontDocumentData.ownerId = result.userId;
        initUserFrontDocumentData.ownerName = result.userId;
        yield controllers_1.AddDocument(initUserFrontDocumentData);
        // 初始化用户后端文档
        const initUserBackDocumentData = JSON.parse(mockEaxmple.BackDocumentTemplate);
        initUserBackDocumentData.ownerId = result.userId;
        initUserBackDocumentData.ownerName = result.userId;
        yield controllers_1.AddDocument(initUserBackDocumentData);
        // 初始化用户API接口文档
        const initUserApiDocumentData = JSON.parse(mockEaxmple.ApiDocumentTemplate);
        initUserApiDocumentData.ownerId = result.userId;
        initUserApiDocumentData.ownerName = result.userId;
        yield controllers_1.AddDocument(initUserApiDocumentData);
        return (ctx.body = dataHandle_1.success({
            userName,
            userId: result.userId,
            token,
            msg: result.msg,
            avatar: result.avatar,
            regDate: result.regDate,
            email,
            role
        }, "注册成功"));
    }
});
/**
 * 用户登录
 * 请求参数
 *  参数名	类型	必填	描述	默认值	参考值
 *  userName	string	是	用户id	-	qianyuhui
 *  passWord	string	是	用户密码,md5加密	-	78e731027d8fd50ed642340b7c9a63b3
 * 返回参数
 *  'state': {
 *      'code': 1,
 *      'msg': '登录成功'
 *  },
 *  'data': {
 *      'userId':'',
 *      'userName':'',
 *      'token': xxx
 *  }
 */
exports.login = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userName, passWord, email } = ctx.request.body;
    // 后端先做初步的数据校验和非法字符处理
    if (validator_1.default.userCheck(userName) && validator_1.default.passCheck(passWord)) {
        // 数据符合规范
        // 查询数据库
        const result = {
            status: "",
            userId: "",
            userName: "",
            avatar: "",
            email: "",
            msg: "",
            role: "",
            regDate: undefined
        };
        const hadUser = yield controllers_1.LoginUser({ userName, passWord });
        // console.log("登录用户状况:\n", result);
        if (hadUser === null || hadUser.passWord !== passWord) {
            result.msg = "账户不存在或者密码错误";
            result.status = "error";
        }
        else {
            // console.log("查询后的信息为:");
            // console.log(hadUser);
            result.msg = "用户登录成功!";
            result.status = "success";
        }
        if (result.status === "error") {
            // 用户不存在 或者 用户密码错误
            return (ctx.body = dataHandle_1.error(result.msg));
        }
        else {
            // console.log("result", result);
            const { userName, _id, msg, avatar, regDate, email, role } = hadUser;
            const token = jwt.sign({
                userId: _id,
                userName: userName,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 天
            }, config_1.config.app.keys);
            return (ctx.body = dataHandle_1.success({ userName, userId: _id, token, msg, avatar, regDate, email, role }, "登录成功"));
        }
    }
    else {
        // 用户提交数据异常
        return (ctx.body = dataHandle_1.error("用户数据不正常"));
    }
});
exports.userInfo = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { userId } = ctx.tokenContent;
    const token = ctx.token;
    let hadUser = undefined;
    hadUser = yield controllers_1.FindUserById(userId);
    const { userName, avatar, regDate, email, role } = hadUser;
    return (ctx.body = dataHandle_1.success({ userName, userId, avatar, token, regDate, email, role, msg: "获取成功!" }, "获取成功!"));
});
exports.tokenLogin = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const token = ctx.token;
    let hadUser = undefined;
    if (!token) {
        return (ctx.body = dataHandle_1.error("请重新登录!"));
    }
    try {
        // await jwt.verify(token, config.app.keys, function (err: any, result: any) {
        //   decode = result
        // })
        // const userId = JSON.parse(JSON.stringify(decode)).userId;
        // const userName = JSON.parse(JSON.stringify(decode)).userName;
        const { userId, userName } = ctx.tokenContent;
        hadUser = yield controllers_1.FindUserById(userId);
        const { avatar, regDate, email, role } = hadUser;
        if (hadUser !== null) {
            return (ctx.body = dataHandle_1.success({
                userName,
                userId,
                token,
                avatar,
                regDate,
                email,
                role,
                msg: "登录成功!"
            }, "登录成功!"));
        }
        else {
            return (ctx.body = dataHandle_1.error("验证失败!"));
        }
    }
    catch (err) {
        return (ctx.body = dataHandle_1.error("会话过期!"));
    }
});
exports.updateUser = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const data = ctx.request.body;
    const { userId } = ctx.tokenContent;
    const passWord = data.newPass
        ? ctx
            .checkBody("newPass")
            .notEmpty()
            .len(6, 32).value
        : undefined;
    const userName = data.userName
        ? ctx
            .checkBody("userName")
            .notEmpty()
            .len(4, 20).value
        : undefined;
    const avatar = data.avatar
        ? ctx
            .checkBody("avatar")
            .notEmpty()
            .isUrl(undefined, {
            allow_underscores: true,
            allow_protocol_relative_urls: true
        }).value
        : undefined;
    const role = data.role ? ctx.checkBody("role").notEmpty().value : undefined;
    const email = data.email
        ? ctx
            .checkBody("email")
            .notEmpty()
            .isEmail("输入的邮箱格式不正确!").value
        : undefined;
    if (ctx.errors) {
        // console.log(ctx.errors);
        return (ctx.body = dataHandle_1.error("用户数据不正常,更新失败!"));
    }
    const user = yield controllers_1.FindUserById(userId);
    if (data.oldPass && data.oldPass !== user.passWord) {
        return (ctx.body = dataHandle_1.error("用户原密码不正确!"));
    }
    // 如果用户改名，需要做用户名重复验证
    if (user.userName !== userName) {
        const findUser = yield controllers_1.FindUserByName(userName);
        if (findUser) {
            return (ctx.body = dataHandle_1.error("无法修改用户名，该用户名已存在!"));
        }
    }
    // 如果用户修改邮箱，需要做邮箱重复验证
    if (user.email !== email) {
        const findUser = yield controllers_1.FindUserByEmail(email);
        if (findUser) {
            return (ctx.body = dataHandle_1.error("无法修改邮箱，该邮箱已存在!"));
        }
    }
    // 如果不是格式正常或者不是正在修改的属性,则保留原先数据
    user.userName = userName || user.userName;
    user.passWord = passWord || user.passWord;
    user.avatar = avatar || user.avatar;
    user.role = role || user.role;
    user.email = email || user.email;
    const result = yield controllers_1.UpdateUser(user);
    return (ctx.body = dataHandle_1.success({}, "更新成功!"));
});
//# sourceMappingURL=user.js.map