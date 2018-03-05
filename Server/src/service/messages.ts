import { AllMessages, AddMessage } from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';



export const messagesList = async(ctx: any) => {
  const { userId } = ctx.tokenContent;
  const result = await AllMessages(userId)
  return ctx.body = success(result, '获取成功')
}

export const addMessage = async(message: MessageData) => {
  await AddMessage(message)
}
