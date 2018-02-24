import { AllMessages, AddMessage, UpdateMessage } from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';



export const messagesList = async(ctx: any) => {
  const { userId } = ctx.tokenContent;
  const result = await AllMessages()
  return ctx.body = success(result, '获取成功')
}

export const addMessage = async(ctx: any) => {
  const data = ctx.request.body;
  const { userId } = ctx.tokenContent;
  const result = await AddMessage(data)
  return ctx.body = success({}, '添加成功!')
}

export const updateMessage = async(ctx: any) => {
  const { userId } = ctx.tokenContent;
  console.log(userId)
  const result = await AllMessages()
  return ctx.body = success(result, '更新成功')
}