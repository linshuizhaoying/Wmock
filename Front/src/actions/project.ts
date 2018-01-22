import { FETCH_PROJECT,FETCH_UNJOINPROJECT } from '../constants/project'
import  notification  from 'antd/lib/notification';

const fetch_project = (data: any) => ({
  type: FETCH_PROJECT,
  data: data
})

const fetch_unJoinproject = (data: any) => ({
  type: FETCH_UNJOINPROJECT,
  data: data
})
// const add_message = (data: any) => ({
//   type: ADD_MESSAGE,
//   data: data
// })

export function fetchProject (user: any) {
  return (dispatch: any) => {
    dispatch(fetch_project(user))
  }
}

export function fetchUnJoinProject (user: any) {
  return (dispatch: any) => {
    dispatch(fetch_unJoinproject(user))
  }
}


export function errorProject (msg: string) {
  notification.error({
    message:' 获取列表失败!',
    description: msg,
    duration: 2
  })
}