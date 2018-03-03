import { error, success } from '../utils/dataHandle';
import {
  AddInterface,
  RemoveInterface,
  UpdateInterface,
  FindInterfaceById,
  CheckInterfaceExist
} from '../db/controllers/index';
const _ = require('lodash')
const field = require('../db/models/field')

export const addInterface = async (ctx: any) => {
  const interfaceItem: InterfaceData = ctx.request.body;
  const projectId = ctx.checkBody('projectId').notEmpty().len(1, 32).value
  const interfaceName = ctx.checkBody('interfaceName').notEmpty().len(1, 32).value
  const url = ctx.checkBody('url').notEmpty().len(1, 32).value
  const method = ctx.checkBody('method').notEmpty().len(1, 32).value
  const desc = ctx.checkBody('desc').notEmpty().value
  const mode = ctx.checkBody('mode').notEmpty().value
  if (ctx.errors) {
    return ctx.body = error('用户数据不正常,添加失败!')
  }
  const exist = await CheckInterfaceExist(projectId, url, method)
  console.log(exist)
  if (exist) {
    return ctx.body = error('接口已经存在!')
  } else {
    const result = await AddInterface(interfaceItem)
    return ctx.body = success({ interfaceId: result }, '添加成功!')
  }

}


export const updateInterface = async (ctx: any) => {
  const interfaceItem: InterfaceData = ctx.request.body;
  const _id = ctx.checkBody('_id').notEmpty().value
  const url = ctx.checkBody('url').notEmpty().value
  const projectId = ctx.checkBody('projectId').notEmpty().value
  const mode = ctx.checkBody('mode').notEmpty().value
  const method = ctx.checkBody('method').notEmpty().value
  const interfaceName = ctx.checkBody('interfaceName').notEmpty().value
  const desc = ctx.checkBody('desc').notEmpty().value
  if (ctx.errors) {
    return ctx.body = error('用户数据不正常,更新失败!')
  }
  const result = await UpdateInterface(interfaceItem)

  return ctx.body = success({}, '更新成功!')
}

export const removeInterface = async (ctx: any) => {
  const { interfaceId } = ctx.request.body;
  const id = ctx.checkBody('interfaceId').notEmpty().value
  if (ctx.errors) {
    return ctx.body = error('用户数据不正常,删除失败!')
  }
  const result = await RemoveInterface(interfaceId)
  return ctx.body = success({}, '删除成功!')
}

export const cloneInterface = async (ctx: any) => {
  const { projectId, interfaceId } = ctx.request.body;
  const vaildProjectId = ctx.checkBody('projectId').notEmpty().value
  const validInterfaceId = ctx.checkBody('interfaceId').notEmpty().value
  if (ctx.errors) {
    return ctx.body = error('用户数据不正常,克隆失败!')
  }
  const oldInterface = await FindInterfaceById(interfaceId)
  // 洗下接口数据
  const cleanInterface = oldInterface.map((item: InterfaceData) => _.pick(item, field.pureInterfaceField))
  cleanInterface[0].projectId = projectId
  const result = await AddInterface(cleanInterface[0])
  return ctx.body = success({}, '克隆成功!')
}

export const cloneInterfaceItem = async (projectId: string, interfaceId: string) => {
  const oldInterface = await FindInterfaceById(interfaceId)
  // 洗下接口数据
  const cleanInterface = oldInterface.map((item: InterfaceData) => _.pick(item, field.pureInterfaceField))
  cleanInterface[0].projectId = projectId
  return await AddInterface(cleanInterface[0])
}