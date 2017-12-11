import { FETCH_MESSAGES } from '../constants/messages'
import  notification  from 'antd/lib/notification';

const fetch_messages = () => ({
  type: FETCH_MESSAGES
})

// const add_message = (data: any) => ({
//   type: ADD_MESSAGE,
//   data: data
// })

export function fetchMessages () {
  return (dispatch: any) => {
    dispatch(fetch_messages())
  }
}

export function errorMessages (msg: string) {
  notification.error({
    message:' 获取列表失败!',
    description: msg,
    duration: 2
  })
}