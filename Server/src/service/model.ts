import {
  AddModel,
  BaseModelList,
  CustomModelList,
  RemoveModel,
  UpdateModel
} from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';
interface Model {
  modelDesc: String,
  modelMode: String,
  modelDataName: String,
  _id?: String
}

export const baseModelList = async (ctx: any) => {
  const result = await BaseModelList()
  return ctx.body = success(result, '获取成功')
}

export const customModelList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const result = await CustomModelList(userId)
  return ctx.body = success(result, '获取成功')
}

export const addModel = async (ctx: any) => {
  const model: ModelData = ctx.request.body;
  const modelDesc = ctx.checkBody('modelDesc').notEmpty().value
  const modelMode = ctx.checkBody('modelMode').notEmpty().value
  const modelDataName = ctx.checkBody('modelDataName').notEmpty().value
  const userId = ctx.checkBody('userId').notEmpty().value
  const userName = ctx.checkBody('userName').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,添加失败!')
  }
  await AddModel(model)

  return ctx.body = success({}, '添加成功!')
}


export const updateModel = async (ctx: any) => {
  const model: ModelData = ctx.request.body;
  const modelDesc = ctx.checkBody('modelDesc').notEmpty().value
  const modelMode = ctx.checkBody('modelMode').notEmpty().value
  const modelDataName = ctx.checkBody('modelDataName').notEmpty().value
  const _id = ctx.checkBody('_id').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,更新失败!')
  }
  await UpdateModel(model)

  return ctx.body = success({}, '更新成功!')
}

export const removeModel = async (ctx: any) => {
  const { id } = ctx.request.body;
  const modelId = ctx.checkBody('id').notEmpty().value
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,删除失败!')
  }
  await RemoveModel(id)

  return ctx.body = success({}, '删除成功!')
}
