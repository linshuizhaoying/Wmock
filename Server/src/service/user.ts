import * as jwt from "jsonwebtoken";

import {
  AddDocument,
  AddRegUser,
  FindUserByEmail,
  FindUserById,
  FindUserByName,
  LoginUser,
  UpdateUser
} from "../db/controllers";
import { error, success } from "../utils/dataHandle";

import Validator from "../utils/validator";
import { config } from "../config";
import { importProjectData } from "./project";

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

export const reg = async (ctx: any) => {
  // console.log(ctx.request.body);
  const { userName, passWord, email, role } = ctx.request.body;
  // 后端先做初步的数据校验和非法字符处理
  if (
    Validator.userCheck(userName) &&
    Validator.passCheck(passWord) &&
    Validator.emailCheck(email)
  ) {
    // 如果用户改名，需要做用户名重复验证

    const findUserName = await FindUserByName(userName);
    if (findUserName) {
      return (ctx.body = error("该用户名已存在!"));
    }

    // 如果用户修改邮箱，需要做邮箱重复验证

    const findUserEmail = await FindUserByEmail(email);
    if (findUserEmail) {
      return (ctx.body = error("该用邮箱已存在!"));
    }

    const result = await AddRegUser({ userName, passWord, email, role });
    const token = jwt.sign(
      {
        userId: result.userId,
        userName: userName,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 天
      },
      config.app.keys
    );
    // 初始化用户数据
    const initUserProjectData: ProjectData = JSON.parse(
      mockEaxmple.UserDemoProject
    );
    initUserProjectData.masterId = result.userId;
    await importProjectData(initUserProjectData);
    // 初始化用户前端文档
    const initUserFrontDocumentData: DocumentData = JSON.parse(
      mockEaxmple.FrontDocumentTemplate
    );
    initUserFrontDocumentData.ownerId = result.userId;
    initUserFrontDocumentData.ownerName = result.userId;
    await AddDocument(initUserFrontDocumentData);
    // 初始化用户后端文档
    const initUserBackDocumentData: DocumentData = JSON.parse(
      mockEaxmple.BackDocumentTemplate
    );
    initUserBackDocumentData.ownerId = result.userId;
    initUserBackDocumentData.ownerName = result.userId;
    await AddDocument(initUserBackDocumentData);
    // 初始化用户API接口文档
    const initUserApiDocumentData: DocumentData = JSON.parse(
      mockEaxmple.ApiDocumentTemplate
    );
    initUserApiDocumentData.ownerId = result.userId;
    initUserApiDocumentData.ownerName = result.userId;
    await AddDocument(initUserApiDocumentData);

    return (ctx.body = success(
      {
        userName,
        userId: result.userId,
        token,
        msg: result.msg,
        avatar: result.avatar,
        regDate: result.regDate,
        email,
        role
      },
      "注册成功"
    ));
  }
};

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
export const login = async (ctx: any) => {
  const { userName, passWord, email } = ctx.request.body;
  // 后端先做初步的数据校验和非法字符处理
  if (Validator.userCheck(userName) && Validator.passCheck(passWord)) {
    // 数据符合规范
    // 查询数据库
    const result: Result = {
      status: "",
      userId: "",
      userName: "",
      avatar: "",
      email: "",
      msg: "",
      role: "",
      regDate: undefined
    };
    const hadUser = await LoginUser({ userName, passWord });
    // console.log("登录用户状况:\n", result);
    if (hadUser === null || hadUser.passWord !== passWord) {
      result.msg = "账户不存在或者密码错误";
      result.status = "error";
    } else {
      // console.log("查询后的信息为:");
      // console.log(hadUser);
      result.msg = "用户登录成功!";
      result.status = "success";
    }

    if (result.status === "error") {
      // 用户不存在 或者 用户密码错误
      return (ctx.body = error(result.msg));
    } else {
      // console.log("result", result);
      const { userName, _id, msg, avatar, regDate, email, role } = hadUser;
      const token = jwt.sign(
        {
          userId: _id,
          userName: userName,
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 天
        },
        config.app.keys
      );
      return (ctx.body = success(
        { userName, userId: _id, token, msg, avatar, regDate, email, role },
        "登录成功"
      ));
    }
  } else {
    // 用户提交数据异常
    return (ctx.body = error("用户数据不正常"));
  }
};

export const userInfo = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const token = ctx.token;
  let hadUser = undefined;
  hadUser = await FindUserById(userId);
  const { userName, avatar, regDate, email, role } = hadUser;
  return (ctx.body = success(
    { userName, userId, avatar, token, regDate, email, role, msg: "获取成功!" },
    "获取成功!"
  ));
};

export const tokenLogin = async (ctx: any) => {
  const token = ctx.token;
  let hadUser = undefined;
  if (!token) {
    return (ctx.body = error("请重新登录!"));
  }
  try {
    // await jwt.verify(token, config.app.keys, function (err: any, result: any) {
    //   decode = result
    // })
    // const userId = JSON.parse(JSON.stringify(decode)).userId;
    // const userName = JSON.parse(JSON.stringify(decode)).userName;
    const { userId, userName } = ctx.tokenContent;
    hadUser = await FindUserById(userId);
    const { avatar, regDate, email, role } = hadUser;
    if (hadUser !== null) {
      return (ctx.body = success(
        {
          userName,
          userId,
          token,
          avatar,
          regDate,
          email,
          role,
          msg: "登录成功!"
        },
        "登录成功!"
      ));
    } else {
      return (ctx.body = error("验证失败!"));
    }
  } catch (err) {
    return (ctx.body = error("会话过期!"));
  }
};

export const updateUser = async (ctx: any) => {
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
    return (ctx.body = error("用户数据不正常,更新失败!"));
  }

  const user = await FindUserById(userId);
  if (data.oldPass && data.oldPass !== user.passWord) {
    return (ctx.body = error("用户原密码不正确!"));
  }
  // 如果用户改名，需要做用户名重复验证
  if (user.userName !== userName) {
    const findUser = await FindUserByName(userName);
    if (findUser) {
      return (ctx.body = error("无法修改用户名，该用户名已存在!"));
    }
  }
  // 如果用户修改邮箱，需要做邮箱重复验证
  if (user.email !== email) {
    const findUser = await FindUserByEmail(email);
    if (findUser) {
      return (ctx.body = error("无法修改邮箱，该邮箱已存在!"));
    }
  }

  // 如果不是格式正常或者不是正在修改的属性,则保留原先数据
  user.userName = userName || user.userName;
  user.passWord = passWord || user.passWord;
  user.avatar = avatar || user.avatar;
  user.role = role || user.role;
  user.email = email || user.email;
  const result = await UpdateUser(user);
  return (ctx.body = success({}, "更新成功!"));
};
