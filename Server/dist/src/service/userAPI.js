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
const validator_1 = require("../utils/validator");
const controllers_1 = require("../db/controllers");
const config_1 = require("../config");
// 返回正常数据
const success = (data) => {
    return {
        'state': {
            'code': 1,
            'msg': data.msg
        },
        'data': {
            data
        }
    };
};
// 返回错误提醒
const error = (data) => {
    return {
        'state': {
            'code': data.code,
            'msg': data.msg
        }
    };
};
/**
 *  用户注册
 *  请求参数
 *  参数名	类型	必填	描述	默认值	参考值
 *  username	string	是	用户id	-	qianyuhui
 *  password	string	是	用户密码,md5加密	-	78e731027d8fd50ed642340b7c9a63b3
 *  email	string	否	用户邮箱	-	4799109@qq.com
 *  返回参数
 *  {
 *    "state": {
 *        "code": 1,
 *        "msg": "注册成功!"
 *    },
 *    "data": {
 *        "userID":"1111",
 *        "userName":"666"
 *    }
 * }
 */
exports.reg = (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log(ctx.request.body);
    const { username, password, email, role } = ctx.request.body;
    // 后端先做初步的数据校验和非法字符处理
    if (validator_1.default.userCheck(username) && validator_1.default.passCheck(password) && validator_1.default.emailCheck(email)) {
        // 数据符合规范
        // 插入数据库并验证重名
        let result = '';
        result = yield controllers_1.AddRegUser({ username, password, email, role });
        console.log('添加用户状况:\n', result);
        if (result.status === 'error') {
            // 用户名重复
            return ctx.body = error({
                code: 2,
                msg: result.msg
            });
        }
        else {
            const { userName, userId, msg } = result;
            const token = jwt.sign({
                userId: userId,
                userName: userName,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 天
            }, config_1.config.app.keys);
            return ctx.body = success({ userName, userId, token, msg });
        }
    }
    else {
        // 用户提交数据异常
        return ctx.body = error({
            code: 2,
            msg: '用户数据不正常'
        });
    }
});
/**
 * 用户登录
 * 请求参数
 *  参数名	类型	必填	描述	默认值	参考值
 *  username	string	是	用户id	-	qianyuhui
 *  password	string	是	用户密码,md5加密	-	78e731027d8fd50ed642340b7c9a63b3
 * 返回参数
 *  "state": {
 *      "code": 1,
 *      "msg": "登录成功"
 *  },
 *  "data": {
 *      "userId":'',
 *      "userName":'',
 *      "token": xxx
 *  }
 */
exports.login = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const { username, password, email } = ctx.request.body;
    // 后端先做初步的数据校验和非法字符处理
    if (validator_1.default.userCheck(username) && validator_1.default.passCheck(password)) {
        // 数据符合规范
        // 查询数据库
        const result = {
            status: '',
            userId: '',
            userName: '',
            msg: ''
        };
        const hadUser = yield controllers_1.LoginUser({ username, password });
        console.log('登录用户状况:\n', result);
        if (hadUser === null || hadUser.password !== password) {
            result.msg = '账户不存在或者密码错误';
            result.status = 'error';
        }
        else {
            console.log('查询后的信息为:');
            console.log(hadUser);
            result.msg = '用户登录成功!';
            result.status = 'success';
            result.userId = hadUser._id;
            result.userName = hadUser.username;
        }
        if (result.status === 'error') {
            // 用户不存在 或者 用户密码错误
            return ctx.body = error({
                code: 2,
                msg: result.msg
            });
        }
        else {
            const { userName, userId, msg } = result;
            const token = jwt.sign({
                userId: userId,
                userName: userName,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 天
            }, config_1.config.app.keys);
            return ctx.body = success({ userName, userId, token, msg });
        }
    }
    else {
        // 用户提交数据异常
        return ctx.body = error({
            code: 2,
            msg: '用户数据不正常'
        });
    }
});
exports.userInfo = (ctx) => __awaiter(this, void 0, void 0, function* () {
    return ctx.body = { userInfo: '{username:test110,password:nopass,email:test}' };
});
exports.token = (ctx) => __awaiter(this, void 0, void 0, function* () {
    // 根据接口规范返回数据
    return ctx.body = {
        'state': {
            'code': 1,
            'msg': '登录成功'
        },
        'data': {
            'userId': ctx.tokenContent.userId,
            'userName': ctx.tokenContent.userName
        }
    };
});
//# sourceMappingURL=userApi.js.map