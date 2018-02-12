// 返回正常数据
export const success = ( data: any, msg: string) => {
  return {
    'state': {
        'code': 1,
        'msg': msg
    },
    'data': {
       data
    }
 }
}
// 返回错误提醒
export const error = (msg: string) => {
  return{
    'state': {
        'code': 2,
        'msg':  msg
    }
  }
}