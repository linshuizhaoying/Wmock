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
const config_1 = require("../config");
const io = require('socket.io');
const http = require('http');
const onlineSocket = new Map(); // 维护一个在线的Socket表,和用户ID一对一对应。里面保存socket对象。用于筛选消息接受者
module.exports = function () {
    const createServer = (app) => {
        const server = http.Server(app.callback());
        const ioServer = io(server);
        messageHandler(ioServer);
        return server;
    };
    const messageHandler = (io) => {
        io.on('connection', (socket) => {
            // 监听客户端传来的登录信息，更新在线人数。
            socket.on('userLogin', (data) => __awaiter(this, void 0, void 0, function* () {
                console.log('socket信息接收:用户登录socket', data);
                // 先判断用户token是否正常(过期或者校验不对则抛弃, 登录接口也做了校验，因此这个socket消息大部分是安全的)
                let tokenContent;
                try {
                    tokenContent = JSON.parse(JSON.stringify(yield jwt.verify(data.token, config_1.config.app.keys)));
                    const userId = tokenContent.userId;
                    // 添加到在线列表
                    onlineSocket.set(userId, socket);
                    console.log('onlineSocket.get(userId):', onlineSocket.get(userId));
                }
                catch (err) {
                    // 如果以后有日志可以写进去
                    console.log('无效的token');
                }
            }));
            // 监听客户端传来的退出登录，然后更新在线人数
            socket.on('userLogout', (data) => __awaiter(this, void 0, void 0, function* () {
                console.log('socket信息接收:用户退出', data);
                // 先判断用户token是否正常(过期或者校验不对则抛弃, 登录接口也做了校验，因此这个socket消息大部分是安全的)
                let tokenContent;
                try {
                    tokenContent = JSON.parse(JSON.stringify(yield jwt.verify(data.token, config_1.config.app.keys)));
                    const userId = tokenContent.userId;
                    // 从在线列表移除
                    onlineSocket.delete(userId);
                    console.log('onlineSocket.get(userId):', onlineSocket.get(userId));
                }
                catch (err) {
                    // 如果以后有日志可以写进去
                    console.log(err);
                    console.log('无效的token');
                }
            }));
            // 监听 客户端 的断线重连,此时可以查看用户是否在soket在线表中
            socket.on('token', (data) => __awaiter(this, void 0, void 0, function* () {
                console.log('socket信息接收: 用户重新连接', data);
                // 先判断用户token是否正常(过期或者校验不对则抛弃, 登录接口也做了校验，因此这个socket消息大部分是安全的)
                let tokenContent;
                try {
                    tokenContent = JSON.parse(JSON.stringify(yield jwt.verify(data.token, config_1.config.app.keys)));
                    const userId = tokenContent.userId;
                    // 添加到在线列表
                    onlineSocket.set(userId, socket);
                    console.log('onlineSocket.get(userId):', onlineSocket.get(userId));
                }
                catch (err) {
                    // 如果以后有日志可以写进去
                    console.log('无效的token');
                }
            }));
            // 监听断线以及关闭
            socket.on('disconnect', (data) => __awaiter(this, void 0, void 0, function* () {
                // console.log('浏览器关闭一个',socket)
                console.log('socket信息接收:用户掉线', data);
            }));
        });
    };
    return { createServer };
};
//# sourceMappingURL=index.js.map