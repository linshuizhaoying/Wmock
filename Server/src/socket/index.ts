import * as jwt from "jsonwebtoken";

import {
  FindDocumentById,
  FindMessageById,
  FindProjectById,
  FindTeamByProjectId,
  FindUserByEmail,
  FindUserById
} from "../db/controllers";

import { config } from "../config";

let io = require("socket.io");
const http = require("http");
const onlineSocket: any = new Map(); // 维护一个在线的Socket表,和用户ID一对一对应。里面保存socket对象。用于筛选消息接受者
module.exports = function() {
  const createServer = (app: any) => {
    const server = http.Server(app.callback());
    io = io(server);
    messageHandler(io);
    return server;
  };
  const messageHandler = (io: any) => {
    io.on("connection", (socket: any) => {
      // 监听客户端传来的登录信息，更新在线人数。
      socket.on("userLogin", async (data: any) => {
        // console.log("socket信息接收:用户登录socket", data);
        // 先判断用户token是否正常(过期或者校验不对则抛弃, 登录接口也做了校验，因此这个socket消息大部分是安全的)
        let tokenContent: TokenData;
        try {
          tokenContent = JSON.parse(
            JSON.stringify(await jwt.verify(data.token, config.app.keys))
          );
          const userId = tokenContent.userId;
          // 添加到在线列表
          onlineSocket.set(userId, socket);

          // console.log("onlineSocket.get(userId):", onlineSocket.get(userId));
        } catch (err) {
          // 如果以后有日志可以写进去
          // console.log("无效的token");
        }
      });
      // 监听客户端传来的退出登录，然后更新在线人数
      socket.on("userLogout", async (data: any) => {
        // console.log("socket信息接收:用户退出", data);
        // 先判断用户token是否正常(过期或者校验不对则抛弃, 登录接口也做了校验，因此这个socket消息大部分是安全的)
        let tokenContent: TokenData;
        try {
          tokenContent = JSON.parse(
            JSON.stringify(await jwt.verify(data.token, config.app.keys))
          );
          const userId = tokenContent.userId;
          // 从在线列表移除
          onlineSocket.delete(userId);
          // console.log("onlineSocket.get(userId):", onlineSocket.get(userId));
        } catch (err) {
          // 如果以后有日志可以写进去
          // console.log(err);
          // console.log("无效的token");
        }
      });

      // 监听 客户端 的断线重连,此时可以查看用户是否在soket在线表中
      socket.on("token", async (data: any) => {
        // console.log("socket信息接收: 用户重新连接", data);
        // 先判断用户token是否正常(过期或者校验不对则抛弃, 登录接口也做了校验，因此这个socket消息大部分是安全的)
        let tokenContent: TokenData;
        try {
          tokenContent = JSON.parse(
            JSON.stringify(await jwt.verify(data.token, config.app.keys))
          );
          const userId = tokenContent.userId;
          // 添加到在线列表
          onlineSocket.set(userId, socket);

          // console.log("onlineSocket.get(userId):", onlineSocket.get(userId));
        } catch (err) {
          // 如果以后有日志可以写进去
          // console.log("无效的token");
        }
      });

      // 团队成员加入 {userId, projectId}
      socket.on("userJoinTeam", async (data: any) => {
        const { userId, projectId } = data;

        const teamList: TeamData = await FindTeamByProjectId(projectId);
        const userInfo: UserData = await FindUserById(userId);
        // 提取所有的用户Id
        const teamMember: Array<string> = [];
        teamMember.push(teamList.masterId);
        teamList.member.map((user: UserData) => {
          teamMember.push(user._id.toString());
        });
        // 过滤自己
        if (teamMember.indexOf(userId) > -1) {
          teamMember.splice(teamMember.indexOf(userId), 1);
        }
        // 向团队成员发送即时信息
        await socket.broadcast.emit("newMessage", {
          content:
            "用户 " + userInfo.userName + " 加入团队 " + teamList.projectName,
          type: "team",
          member: teamMember
        });
      });
      // 团队成员退出 {userId, projectId}
      socket.on("userLeaveTeam", async (data: any) => {
        const { userId, projectId, removeUserId } = data;

        const teamList: TeamData = await FindTeamByProjectId(projectId);
        const userInfo: UserData = await FindUserById(userId);
        // 提取所有的用户Id
        const teamMember: Array<string> = [];
        teamMember.push(teamList.masterId);
        teamList.member.map((user: UserData) => {
          teamMember.push(user._id.toString());
        });

        // 过滤自己
        if (teamMember.indexOf(userId) > -1) {
          teamMember.splice(teamMember.indexOf(userId), 1);
        }
        // 如果是主动离开的
        if (removeUserId === userId) {
          // 向团队成员发送即时信息
          await socket.broadcast.emit("newMessage", {
            content:
              "用户 " + userInfo.userName + " 离开团队" + teamList.projectName,
            projectName: teamList.projectName,
            type: "team",
            member: teamMember
          });
        } else {
          // 给被移除的用户也发条信息
          teamMember.push(removeUserId);
          // 向团队成员发送即时信息
          await socket.broadcast.emit("newMessage", {
            content:
              "用户 " +
              userInfo.userName +
              "被项目" +
              teamList.projectName +
              "移除",
            projectName: teamList.projectName,
            type: "team",
            member: teamMember
          });
        }
      });

      // 邀请成员加入团队
      socket.on("invitedTeamMember", async (data: any) => {
        const { userId, projectId, userEmail } = data;
        const userInfo: UserData = await FindUserById(userId);
        const invitedUser: UserData = await FindUserByEmail(userEmail);
        if (!invitedUser) {
          return;
        }
        const project: ProjectData = await FindProjectById(projectId);
        const member = [];
        // 只让项目创建者显示消息
        if (userId !== project.masterId.toString()) {
          member.push(project.masterId.toString());
        }

        await socket.broadcast.emit("newMessage", {
          content:
            "用户" +
            userInfo.userName +
            " 邀请 " +
            invitedUser.userName +
            " 加入团队 " +
            project.projectName,
          type: "team",
          member: member
        });
      });

      // 成员申请加入团队
      socket.on("applyTeamMember", async (data: any) => {});

      // 拒绝成员加入团队
      socket.on("rejectTeamMember", async (data: any) => {
        const { userId, projectId, rejectUserId, messageId } = data;
        const userInfo: UserData = await FindUserById(userId);
        const rejectUser: UserData = await FindUserById(rejectUserId);
        const project: ProjectData = await FindProjectById(projectId);
        const invitedUser: MessageData = await FindMessageById(messageId);
        const member = [];
        // 谁邀请的就让谁知道...
        member.push(invitedUser.operatorId.toString());

        await socket.broadcast.emit("newMessage", {
          content:
            "用户" +
            rejectUser.userName +
            " 被 " +
            userInfo.userName +
            " 拒绝加入团队 " +
            project.projectName,
          type: "team",
          member: member
        });
      });

      // 文档更新通知
      socket.on("updateDocument", async (data: any) => {
        const { userId, documentId } = data;
        const userInfo: UserData = await FindUserById(userId);
        const documentMember: any = [];
        // 获取分配的项目列表
        const documentData: DocumentData = await FindDocumentById(documentId);
        const assignProjectIdList = documentData.assign;
        // 先加入文档的创建者
        documentMember.push(documentData.ownerId);
        // 查找与这文档相关的所有人,发送消息
        await Promise.all(
          assignProjectIdList.map(async (item: string) => {
            // 查找项目的对应团队
            const team: TeamData = await FindTeamByProjectId(item);
            team.member.map((user: UserData) => {
              // 防止重复
              if (documentMember.indexOf(user._id) === -1) {
                documentMember.push(user._id.toString());
              }
            });
          })
        );
        // 过滤自己
        if (documentMember.indexOf(userId) > -1) {
          documentMember.splice(documentMember.indexOf(userId), 1);
        }
        // 向文档成员发送即时信息
        await socket.broadcast.emit("newMessage", {
          content:
            "用户 " + userInfo.userName + " 更改了文档 " + documentData.name,
          type: "document",
          member: documentMember
        });
      });
      // 项目更改通知
      socket.on("updateProject", async (data: any) => {
        const { userId, projectId } = data;

        const teamList: TeamData = await FindTeamByProjectId(projectId);
        const userInfo: UserData = await FindUserById(userId);
        try {
          // 提取所有的用户Id
          const teamMember: Array<string> = [];
          teamMember.push(teamList.masterId);
          teamList.member.map((user: UserData) => {
            teamMember.push(user._id.toString());
          });
          // 过滤自己
          if (teamMember.indexOf(userId) > -1) {
            teamMember.splice(teamMember.indexOf(userId), 1);
          }
          // 向项目成员发送即时信息
          await socket.broadcast.emit("newMessage", {
            content:
              "用户 " +
              userInfo.userName +
              " 更新了项目 " +
              teamList.projectName,
            type: "project",
            member: teamMember
          });
        } catch (error) {
          // console.log("用户更新了demo");
        }
      });
      // 监听断线以及关闭
      socket.on("disconnect", async (data: any) => {
        // console.log('浏览器关闭一个',socket)
        // console.log("socket信息接收:用户掉线", data);
      });
    });
  };

  return { createServer };
};
