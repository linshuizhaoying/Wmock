import {
  AddDocument,
  AddMessage,
  AllDocument,
  FindTeamByProjectId,
  FindUserById,
  RemoveDocument,
  UpdateDocument
} from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';
const _ = require('lodash')

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
  const userJoinProject: Array<string> = []
  // 筛选出与用户有关的文档显示出来

  await Promise.all(data.map(async (item: DocumentData) => {
    // 如果文档是用户建立的,自然放进去
    if (item.ownerId == userId) {
      result.push(item)
      // 如果这个文档有分配给其它项目
      if (item.assign.length > 0) {
        item.assign.map((projectId: string) => {
          // 把分配的Id加进去
          userJoinProject.push(projectId)
        })
      }
    }
  }))
  await Promise.all(data.map(async (item: DocumentData) => {
    // 不然对分配的项目进行查找,看看团队里有没有用户
    if (item.ownerId != userId) {
      await Promise.all(item.assign.map(async (projectId: string) => {
        const teamData: TeamData = await FindTeamByProjectId(projectId)
        teamData.member.map((user: UserData) => {
          // 如果用户属于这个团队,那么他同样能够查询该项目的文档
          if (user._id == userId) {
            result.push(item)
          }
        })
        // 如果其它分配项目中包含用户的项目Id,说明项目中有人建立了新的文档分配给它
        if (userJoinProject.indexOf(projectId) > -1) {
          result.push(item)
        }
      }))

    }
  }))
  return ctx.body = success(await _.uniqBy(result, '_id'), '获取成功')
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

  // 添加对应文档更新消息
  const userData: UserData = await FindUserById(userId)
  const updateDocumentMessage: MessageData = {
    operatorId: userId,
    operatorName: userData.userName,
    action: 'update',
    projectId: '',
    objectId: document._id,
    objectName: name,
    desc: '用户 ' + userData.userName + ' 更新了文档 ' + name,
    userId: userId,
    avatar: userData.avatar,
    type: 'document'
  }
  await AddMessage(updateDocumentMessage)


  return ctx.body = success({}, '更新成功!')
}

export const removeDocument = async (ctx: any) => {
  const { id } = ctx.request.body;
  await RemoveDocument(id)
  return ctx.body = success({}, '删除成功!')
}
