import { FETCH_DOCUMENT } from '../constants/document'
import  notification  from 'antd/lib/notification';

const fetch_document = () => ({
  type: FETCH_DOCUMENT
})

// const add_message = (data: any) => ({
//   type: ADD_MESSAGE,
//   data: data
// })

export function fetchDocument () {
  return (dispatch: any) => {
    dispatch(fetch_document())
  }
}

export function errorDocument (msg: string) {
  notification.error({
    message:' 获取列表失败!',
    description: msg,
    duration: 2
  })
}