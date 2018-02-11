import notification from 'antd/lib/notification';
import {
  ALLOWED_JOINGROUP,
  FETCH_TEAM,
  INVITED_GROUPMEMBER,
  REJECT_JOINGROUP,
  REMOVE_GROUPMEMBER,
  SEND_APPLY
  } from '../constants/team';

const fetchTeamData = (id: Id) => ({
  type: FETCH_TEAM,
  data: id
})
const sendApplyData = (apply: Apply) => ({
  type: SEND_APPLY,
  data: apply
})

const rejectJoinGroupData = (member: GroupMember) => ({
  type: REJECT_JOINGROUP,
  data: member
})

const removeGroupMemberData = (member: GroupMember) => ({
  type: REMOVE_GROUPMEMBER,
  data: member
})

const allowedJoinGroupData = (member: GroupMember) => ({
  type: ALLOWED_JOINGROUP,
  data: member
})

const invitedGroupMemberData = (member: GroupMember) => ({
  type: INVITED_GROUPMEMBER,
  data: member
})

export function fetchTeam(id: Id) {
  return (dispatch: Function) => {
    dispatch(fetchTeamData(id))
  }
}

export function sendApply(apply: Apply) {
  return (dispatch: Function) => {
    dispatch(sendApplyData(apply))
  }
}

export function rejectJoinGroup(member: GroupMember) {
  return (dispatch: Function) => {
    dispatch(rejectJoinGroupData(member))
  }
}

export function removeGroupMember(member: GroupMember) {
  return (dispatch: Function) => {
    dispatch(removeGroupMemberData(member))
  }
}

export function allowedJoinGroup(member: GroupMember) {
  return (dispatch: Function) => {
    dispatch(allowedJoinGroupData(member))
  }
}

export function invitedGroupMember(member: GroupMember) {
  return (dispatch: Function) => {
    dispatch(invitedGroupMemberData(member))
  }
}

export function sendApplySuccess(msg: string) {
  notification.success({
    message: '发送成功!',
    description: '发送成功!',
    duration: 1
  })
  return
}

export function sendApplyError(msg: string) {
  notification.error({
    message: '发送失败!',
    description: '发送失败!',
    duration: 1
  })
  return
}

export function allowedJoinSuccess(msg: string) {
  notification.success({
    message: '加入成功!',
    description: '加入成功!',
    duration: 1
  })
  return
}

export function rejectJoinError(msg: string) {
  notification.error({
    message: '拒绝失败!',
    description: '拒绝失败!',
    duration: 1
  })
  return
}

export function rejectJoinSuccess(msg: string) {
  notification.success({
    message: '拒绝成功!',
    description: '拒绝成功!',
    duration: 1
  })
  return
}

export function allowedJoinError(msg: string) {
  notification.error({
    message: '加入失败!',
    description: '加入失败!',
    duration: 1
  })
  return
}

export function removeGroupMemberSuccess(msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeGroupMemberError(msg: string) {
  notification.error({
    message: '移除失败!',
    description: '移除失败!',
    duration: 1
  })
  return
}

export function invitedGroupMemberSuccess(msg: string) {
  notification.success({
    message: '邀请成功!',
    description: '邀请成功!',
    duration: 1
  })
  return
}

export function invitedGroupMemberError(msg: string) {
  notification.error({
    message: '邀请失败!',
    description: '邀请失败!',
    duration: 1
  })
  return
}

export function errorTeam(msg: string) {
  notification.error({
    message: ' 获取团队列表失败!',
    description: msg,
    duration: 2
  })
  return
}