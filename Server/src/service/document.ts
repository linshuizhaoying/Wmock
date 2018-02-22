import { AllDocument } from '../db/controllers/index';
import { error, success } from '../utils/dataHandle'

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

export const documentList = async(ctx: any) => {
  const result = await AllDocument()
  return ctx.body = success(result, '获取成功')
}


export const addDocument = async(ctx: any) => {
  const document: Document = ctx.request.body;
  console.log(document)
  return ctx.body = success({}, '添加成功!')
}


export const updateDocument = async(ctx: any) => {
  const document: Document = ctx.request.body;
  console.log(document)
  return ctx.body = success({}, '更新成功!')
}

export const removeDocument = async(ctx: any) => {
  const document: Document = ctx.request.body;
  console.log(document)
  return ctx.body = success({}, '删除成功!')
}
