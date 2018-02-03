import { FETCH_TEAM,  SEND_APPLY, REJECT_JOINGROUP, REMOVE_GROUPMEMBER, ALLOWED_JOINGROUP, INVITED_GROUPMEMBER} from '../constants/team'
import  notification  from 'antd/lib/notification';
interface Apply{
  operatorId: String,
  operatorName: String,
  projectId: String,
  time: Date,
  objectId: String,
  objectName: String,
  desc: String,
  type: String,
}


interface GroupMember{
  userId?: String,
  userEmail?: String,
  projectId?: String,
  groupId?: String,
  messageId?: String,
}


const fetch_team = (data: any) => ({
  type: FETCH_TEAM,
  data: data
})
const send_apply = (apply: Apply) => ({
  type: SEND_APPLY,
  data: apply
})

const reject_JoinGroup = (data: any) => ({
  type: REJECT_JOINGROUP,
  data: data
})

const remove_GroupMember = (data: any) => ({
  type: REMOVE_GROUPMEMBER,
  data: data
})

const allowed_JoinGroup = (data: any) => ({
  type: ALLOWED_JOINGROUP,
  data: data
})

const invited_GroupMember = (data: any) => ({
  type: INVITED_GROUPMEMBER,
  data: data
})

// const add_message = (data: any) => ({
//   type: ADD_MESSAGE,
//   data: data
// })

export function fetchTeam (id: Id) {
  return (dispatch: any) => {
    dispatch(fetch_team(id))
  }
}

export function sendApply (apply: Apply) {
  return (dispatch: any) => {
    dispatch(send_apply(apply))
  }
}

export function rejectJoinGroup (member: GroupMember) {
  return (dispatch: any) => {
    dispatch(reject_JoinGroup(member))
  }
}

export function removeGroupMember (member: GroupMember) {
  return (dispatch: any) => {
    dispatch(remove_GroupMember(member))
  }
}


export function allowedJoinGroup (member: GroupMember) {
  return (dispatch: any) => {
    dispatch(allowed_JoinGroup(member))
  }
}

export function invitedGroupMember (member: GroupMember) {
  return (dispatch: any) => {
    dispatch(invited_GroupMember(member))
  }
}

export function sendApplySuccess (msg: string) {
  notification.success({
    message: '发送成功!',
    description: '发送成功!',
    duration: 1
  })
  return
}

export function sendApplyError (msg: string) {
  notification.error({
    message:'发送失败!',
    description: '发送失败!',
    duration: 1
  })
  return
}

export function allowedJoinSuccess (msg: string) {
  notification.success({
    message: '加入成功!',
    description: '加入成功!',
    duration: 1
  })
  return
}

export function rejectJoinError (msg: string) {
  notification.error({
    message:'拒绝失败!',
    description: '拒绝失败!',
    duration: 1
  })
  return
}

export function rejectJoinSuccess (msg: string) {
  notification.success({
    message: '拒绝成功!',
    description: '拒绝成功!',
    duration: 1
  })
  return
}

export function allowedJoinError (msg: string) {
  notification.error({
    message:'加入失败!',
    description: '加入失败!',
    duration: 1
  })
  return
}


export function removeGroupMemberSuccess (msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeGroupMemberError (msg: string) {
  notification.error({
    message:'移除失败!',
    description: '移除失败!',
    duration: 1
  })
  return
}

export function invitedGroupMemberSuccess (msg: string) {
  notification.success({
    message: '邀请成功!',
    description: '邀请成功!',
    duration: 1
  })
  return
}

export function invitedGroupMemberError (msg: string) {
  notification.error({
    message:'邀请失败!',
    description: '邀请失败!',
    duration: 1
  })
  return
}

export function errorTeam (msg: string) {
  notification.error({
    message:' 获取团队列表失败!',
    description: msg,
    duration: 2
  })
  return
}