import { BaseModelList, CustomModelList } from '../db/controllers/index';


// 返回正常数据
const success = ( data: any) => {
  return {
    'state': {
        'code': 1,
        'msg': 'success'
    },
    'data': {
       data
    }
 }
}
// 返回错误提醒
const error = () => {
  return{
    'state': {
        'code': 2,
        'msg':  'error'
    }
  }
}
export const baseModelList = async(ctx: any) => {
  const result = await BaseModelList()
  return ctx.body = success(result)
}

export const customModelList = async(ctx: any) => {
  const { id } = ctx.request.body;
  const result = await CustomModelList(id)
  return ctx.body = success(result)
}