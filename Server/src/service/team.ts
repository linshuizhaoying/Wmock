import {
  AddMessage,
  AddUserToTeam,
  FindMessageById,
  FindProjectById,
  FindTeamByProjectId,
  FindUserByEmail,
  FindUserById,
  RemoveGroupMember,
  TeamList,
  UpdateMessageReaded
} from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';
const _ = require('lodash')
const field = require('../db/models/field')

interface Apply {
  operatorId: String,
  operatorName: String,
  projectId: String,
  time: Date,
  objectId: String,
  objectName: String,
  desc: String,
  type: String,
}

interface GroupMember {
  userId?: String,
  userEmail?: String,
  projectId?: String,
  groupId?: String,
  messageId?: String,
}


export const teamList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  let result = await TeamList(userId)
  // 过滤下敏感信息
  result = result.map((item: TeamData) => {
    // 先过滤一遍Team,不然会影响member的过滤
    item = _.pick(item, field.teamField)
    const temp = item.member.map((o: UserData) => _.pick(o, field.memberField))
    item.member = temp
    return item
  })
  return ctx.body = success(result, '获取成功')
}


export const sendApply = async (ctx: any) => {
  const apply: Apply = ctx.request.body;
  console.log(apply)
  // 对每个属性做不为空的校验
  const operatorId = ctx.checkBody('operatorId').notEmpty().value
  const operatorName = ctx.checkBody('operatorName').notEmpty().value
  const projectId = ctx.checkBody('projectId').notEmpty().value
  const action = ctx.checkBody('action').notEmpty().value
  const objectId = ctx.checkBody('objectId').notEmpty().value
  const objectName = ctx.checkBody('objectName').notEmpty().value
  const desc = ctx.checkBody('desc').notEmpty().value
  const type = ctx.checkBody('type').notEmpty().value

  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,申请失败!')
  }
  const userData: UserData = await FindUserById(operatorId)
  // 添加对应项目消息
  const applyMessage: MessageData = {
    operatorId: operatorId,
    operatorName: operatorName,
    action: action,
    projectId: projectId,
    objectId: objectId,
    objectName: objectName,
    desc: desc,
    userId: operatorId,
    avatar: userData.avatar,
    type: type
  }
  await AddMessage(applyMessage)

  return ctx.body = success({}, '发送成功!')
}

export const rejectJoinGroup = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const rejectUserId = ctx.checkBody('userId').notEmpty().value
  const projectId = ctx.checkBody('projectId').notEmpty().value
  const messageId = ctx.checkBody('messageId').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,操作失败!')
  }
  const project = await FindProjectById(projectId)
  const master: UserData = await FindUserById(userId)
  const user: UserData = await FindUserById(rejectUserId)
  // 通知用户被拒绝的消息
  const rejectMessage: MessageData = {
    operatorId: userId,
    operatorName: master.userName,
    action: 'reject',
    projectId: projectId,
    objectId: rejectUserId,
    objectName: user.userName,
    desc: '用户 ' + user.userName + ' 被拒绝加入项目 ' + project.projectName,
    userId: userId,
    avatar: master.avatar,
    type: 'normal'
  }
  await AddMessage(rejectMessage)

  // 将消息设置为已读不再显示
  const originMessage = await FindMessageById(messageId)
  originMessage.readed = true
  await UpdateMessageReaded(originMessage)

  return ctx.body = success({}, '拒绝成功!')
}

export const removeGroupMember = async (ctx: any) => {
  const removeUserId = ctx.checkBody('userId').notEmpty().value
  const projectId = ctx.checkBody('projectId').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,操作失败!')
  }
  await RemoveGroupMember(projectId, removeUserId)



  // 添加对应接口更新消息
  const project: ProjectData = await FindProjectById(projectId)
  const { userId } = ctx.tokenContent;
  const removeUserData: UserData = await FindUserById(removeUserId)
  const userData: UserData = await FindUserById(userId)
  const state = removeUserId == userId ? '退出' : '移出'
  const updateInterfaceMessage: MessageData = {
    operatorId: userId,
    operatorName: userData.userName,
    action: 'remove',
    projectId: projectId,
    objectId: removeUserId,
    objectName: removeUserData.userName,
    desc: '用户 ' + removeUserData.userName + ' ' + state + ' 项目 ' + project.projectName,
    userId: userId,
    avatar: userData.avatar,
    type: 'normal'
  }
  await AddMessage(updateInterfaceMessage)


  return ctx.body = success({}, state + '成功!')
}


export const allowedJoinGroup = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const acceptUserId = ctx.checkBody('userId').notEmpty().value
  const projectId = ctx.checkBody('projectId').notEmpty().value
  const messageId = ctx.checkBody('messageId').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,操作失败!')
  }
  // 先将用户加入团队
  await AddUserToTeam(projectId, acceptUserId)

  const project = await FindProjectById(projectId)
  const master: UserData = await FindUserById(userId)
  const user: UserData = await FindUserById(acceptUserId)
  // 通知用户被允许加入的消息
  const acceptMessage: MessageData = {
    operatorId: userId,
    operatorName: master.userName,
    action: 'accept',
    projectId: projectId,
    objectId: acceptUserId,
    objectName: user.userName,
    desc: '用户 ' + user.userName + ' 被允许加入项目 ' + project.projectName,
    userId: userId,
    avatar: master.avatar,
    type: 'normal'
  }
  await AddMessage(acceptMessage)
  // 将消息设置为已读不再显示
  const originMessage = await FindMessageById(messageId)
  originMessage.readed = true
  await UpdateMessageReaded(originMessage)

  return ctx.body = success({}, '加入成功!')
}

export const invitedGroupMember = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const userEmail = ctx.checkBody('userEmail').notEmpty().value
  const projectId = ctx.checkBody('projectId').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,操作失败!')
  }
  const inviter: UserData = await FindUserById(userId)
  const user: UserData = await FindUserByEmail(userEmail)
  if (!user) {
    return ctx.body = error('指定邮箱不存在!')
  }
  // 判断指定用户是否在团队中
  const team: TeamData = await FindTeamByProjectId(projectId)
  let find = false
  if (team.masterId.toString() === user._id.toString()) {
    find = true
  }
  team.member.map((item: UserData) => {
    if (item._id.toString() === user._id.toString()) {
      find = true
    }
  })
  if (find) {
    return ctx.body = error('该成员已经在团队中!')
  } else {
    // 通知用户被邀请的消息
    const invitedMessage: MessageData = {
      operatorId: inviter._id,
      operatorName: inviter.userName,
      action: 'invite',
      projectId: projectId,
      objectId: team.projectName,
      objectName: user.userName,
      desc: '用户' + user.userName + ' 被邀请加入项目 ' + team.projectName,
      userId: user._id,
      avatar: user.avatar,
      type: 'team'
    }
    await AddMessage(invitedMessage)
  }



  return ctx.body = success({}, '邀请成功!')
}