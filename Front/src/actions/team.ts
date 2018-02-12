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