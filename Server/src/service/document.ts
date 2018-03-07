import {
  AddDocument,
  AllDocument,
  RemoveDocument,
  UpdateDocument,
  FindUserById,
  AddMessage,
  FindTeamByProjectId
} from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';

interface Document {
  _id?: String,
  type: String,
  assign: Array<String>,
  content: String,
  desc: String,
  name: String,
  ownerId?: String,
  ownerName?: String,
}

export const documentList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const data = await AllDocument()
  const result: Array<DocumentData> = []
  // 筛选出与用户有关的文档显示出来
  await Promise.all(data.map(async (item: DocumentData) => {
    // 如果文档是用户建立的,自然放进去
    if (item.ownerId == userId) {
      result.push(item)
    } else {
      // 不然对分配的项目进行查找,看看团队里有没有用户
      await Promise.all(item.assign.map(async (projectId: string) => {
        const teamData: TeamData = await FindTeamByProjectId(projectId)
        teamData.member.map((user: UserData) => {
          // 如果用户属于这个团队,那么他同样能够查询该项目的文档
          if (user._id == userId) {
            result.push(item)
          }
        })
      }))
    }
  }))
  return ctx.body = success(result, '获取成功')
}


export const addDocument = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const document: DocumentData = ctx.request.body;
  const assign = ctx.checkBody('assign').notEmpty().value
  const content = ctx.checkBody('content').notEmpty().value
  const desc = ctx.checkBody('desc').notEmpty().value
  const name = ctx.checkBody('name').notEmpty().value
  const type = ctx.checkBody('type').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,添加失败!')
  }
  const userData: UserData = await FindUserById(userId)
  document.ownerName = userData.userName
  document.ownerId = userId
  await AddDocument(document)
  // // 添加对应文档增加消息
  // const addDocumentMessage: MessageData = {
  //   operatorId: userId,
  //   operatorName: userData.userName,
  //   action: 'add',
  //   projectId: '',
  //   objectId: documentId,
  //   objectName: name,
  //   desc: '用户 ' + userData.userName + ' 增加了文档 ' + name,
  //   userId: userId,
  //   avatar: userData.avatar,
  //   type: 'normal'
  // }
  // await AddMessage(addDocumentMessage)

  return ctx.body = success({}, '添加成功!')
}


export const updateDocument = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const document: DocumentData = ctx.request.body;
  const assign = ctx.checkBody('assign').notEmpty().value
  const content = ctx.checkBody('content').notEmpty().value
  const desc = ctx.checkBody('desc').notEmpty().value
  const name = ctx.checkBody('name').notEmpty().value
  const type = ctx.checkBody('type').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,添加失败!')
  }
  await UpdateDocument(document)

  // // 添加对应文档更新消息
  // const userData: UserData = await FindUserById(userId)
  // const updateDocumentMessage: MessageData = {
  //   operatorId: userId,
  //   operatorName: userData.userName,
  //   action: 'add',
  //   projectId: '',
  //   objectId: document._id,
  //   objectName: name,
  //   desc: '用户 ' + userData.userName + ' 更新了文档 ' + name,
  //   userId: userId,
  //   avatar: userData.avatar,
  //   type: 'normal'
  // }
  // await AddMessage(updateDocumentMessage)


  return ctx.body = success({}, '更新成功!')
}

export const removeDocument = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const { id } = ctx.request.body;
  await removeDocument(id)
  return ctx.body = success({}, '删除成功!')
}
