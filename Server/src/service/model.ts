import { BaseModelList, CustomModelList } from '../db/controllers/index';
import { error, success } from '../utils/dataHandle'
interface Model {
  modelDesc: String,
  modelMode: String,
  modelName: String,
  _id?: String
}

export const baseModelList = async (ctx: any) => {
  const result = await BaseModelList()
  return ctx.body = success(result, '获取成功')
}

export const customModelList = async (ctx: any) => {
  const { id } = ctx.request.body;
  const result = await CustomModelList(id)
  return ctx.body = success(result, '获取成功')
}

export const addModel = async (ctx: any) => {
  const model: Model = ctx.request.body;
  console.log(model)
  return ctx.body = success({}, '添加成功!')
}


export const updateModel = async (ctx: any) => {
  const model: Model = ctx.request.body;
  console.log(model)
  return ctx.body = success({}, '更新成功!')
}

export const removeModel = async (ctx: any) => {
  const model: Model = ctx.request.body;
  console.log(model)
  return ctx.body = success({}, '删除成功!')
}
