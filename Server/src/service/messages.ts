import {
  AllMessages,
  AddMessage,
  DocumentMessages
} from "../db/controllers/index";
import { error, success } from "../utils/dataHandle";

export const messagesList = async (ctx: any) => {
  const { userId } = ctx.tokenContent;
  const result = await AllMessages(userId);
  return (ctx.body = success(result, "获取成功"));
};

export const documentMessages = async (ctx: any) => {
  const documentId = ctx.checkBody("id").notEmpty().value;
  console.log('documentId: ', documentId)
  if (ctx.errors) {
    console.log(ctx.errors)
    return ctx.body = error('用户数据不正常,获取失败!')
  }
  const result = await DocumentMessages(documentId)
  console.log('result', result)
  return (ctx.body = success(result, "获取成功"));
};

export const addMessage = async (message: MessageData) => {
  await AddMessage(message);
};
