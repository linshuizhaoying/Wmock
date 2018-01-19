import { FETCH_DOCUMENT, DELETE_DOCUMENT, UPDATE_DOCUMENT } from '../constants/document'
import  notification  from 'antd/lib/notification';

const fetch_document = () => ({
  type: FETCH_DOCUMENT
})




const delete_document = (id: any) => ({
  type: DELETE_DOCUMENT,
  id: id
})

const update_document = (data: any) => ({
  type: UPDATE_DOCUMENT,
  data: data
})

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

export function deleteDocument (id:string) {
  return (dispatch: any) => {
    dispatch(delete_document(id))
  }
}


export function updateDocument (data:any) {
  return (dispatch: any) => {
    dispatch(update_document(data))
  }
}
