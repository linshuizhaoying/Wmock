import { AllMessages } from '../db/controllers/index';
import { error, success } from '../utils/dataHandle';



export const messagesList = async(ctx: any) => {
  const result = await AllMessages()
  return ctx.body = success(result, '获取成功')
}
