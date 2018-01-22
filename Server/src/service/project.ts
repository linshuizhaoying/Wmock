import { AllProject, UnJoinProjectList } from '../db/controllers/index';


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


export const projectList = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  const { username } = ctx.request.body;
  const result = await AllProject(username)
  // console.log(result)
  return ctx.body = success(result)
}

export const unJoinProjectList = async(ctx: any) => {
  // console.log('allNews')
  // console.log(ctx.request.body)
  const { id } = ctx.request.body;
  const result = await UnJoinProjectList(id)
  // console.log(result)
  return ctx.body = success(result)
}
