import { AllDocument } from '../db/controllers/index';

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
// // 返回错误提醒
// const error = () => {
//   return{
//     'state': {
//         'code': 2,
//         'msg':  'error'
//     }
//   }
// }


export const documentList = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  // const { username } = ctx.request.body;
  const result = await AllDocument()
  return ctx.body = success(result)
}


export const addDocument = async(ctx: any) => {
  const document: Document = ctx.request.body;
  console.log(document)
  return ctx.body = success('添加成功!')
}


export const updateDocument = async(ctx: any) => {
  const document: Document = ctx.request.body;
  console.log(document)
  return ctx.body = success('更新成功!')
}

export const removeDocument = async(ctx: any) => {
  const document: Document = ctx.request.body;
  console.log(document)
  return ctx.body = success('删除成功!')
}
