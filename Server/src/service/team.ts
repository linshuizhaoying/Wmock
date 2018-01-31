import { myTeam } from '../db/controllers/index';

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



// 返回正常数据
const success = ( data: any) => {
  return {
    'state': {
        'code': 1,
        'msg': 'success'
    },
    'data': {
       data
    }
 }
}
// // 返回错误提醒
// const error = () => {
//   return{
//     'state': {
//         'code': 2,
//         'msg':  'error'
//     }
//   }
// }


export const teamList = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  const { id } = ctx.request.body;
  const result = await myTeam(id)
  // console.log(result)
  return ctx.body = success(result)
}


export const sendApply = async(ctx: any) => {
  const apply: Apply = ctx.request.body;
  console.log(apply)
  return ctx.body = success('发送成功!')
}

export const rejectJoinGroup = async(ctx: any) => {
  const member: GroupMember = ctx.request.body;
  console.log(member)
  return ctx.body = success('拒绝成功!')
}

export const removeGroupMember = async(ctx: any) => {
  const member: GroupMember = ctx.request.body;
  console.log(member)
  return ctx.body = success('移除成功!')
}


export const allowedJoinGroup = async(ctx: any) => {
  const member: GroupMember = ctx.request.body;
  console.log(member)
  return ctx.body = success('加入成功!')
}

export const invitedGroupMember = async(ctx: any) => {
  const member: GroupMember = ctx.request.body;
  console.log(member)
  return ctx.body = success('邀请成功!')
}