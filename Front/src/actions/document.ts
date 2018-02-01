import { FETCH_DOCUMENT, REMOVE_DOCUMENT, UPDATE_DOCUMENT, ADD_DOCUMENT } from '../constants/document'
import  notification  from 'antd/lib/notification';

const fetch_document = () => ({
  type: FETCH_DOCUMENT
})

interface Id {
  id: String
}

interface Document{
  _id? : String,
  type: String,
  assign: Array<String>,
  content: String,
  desc: String,
  name: String,
  ownerId? : String,
  ownerName? : String,
}


const add_document = (data: any) => ({
  type: ADD_DOCUMENT,
  data: data
})

const update_document = (data: any) => ({
  type: UPDATE_DOCUMENT,
  data: data
})

const remove_document = (data: any) => ({
  type: REMOVE_DOCUMENT,
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



export function removeDocument(id: Id) {
  return (dispatch: any) => {
    dispatch(remove_document(id))
  }
}

export function updateDocument(Document: Document) {
  return (dispatch: any) => {
    dispatch(update_document(Document))
  }
}

export function addDocument(Document: Document) {
  return (dispatch: any) => {
    dispatch(add_document(Document))
  }
}



export function updateDocumentSuccess (msg: string) {
  notification.success({
    message: '更新成功!',
    description: '更新成功!',
    duration: 1
  })
  return
}

export function updateDocumentError (msg: string) {
  notification.error({
    message: '更新失败!',
    description:  '更新失败!',
    duration: 1
  })
  return
}
export function removeDocumentSuccess (msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeDocumentError (msg: string) {
  notification.error({
    message: '移除失败!',
    description:  '移除失败!',
    duration: 1
  })
  return
}

export function addDocumentSuccess (msg: string) {
  notification.success({
    message: '添加成功!',
    description: '添加成功!',
    duration: 1
  })
  return
}

export function addDocumentError (msg: string) {
  notification.error({
    message: '添加失败!',
    description:  '添加失败!',
    duration: 1
  })
  return
}
