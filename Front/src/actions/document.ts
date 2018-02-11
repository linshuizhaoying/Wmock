import notification from 'antd/lib/notification';
import {
  ADD_DOCUMENT,
  FETCH_DOCUMENT,
  REMOVE_DOCUMENT,
  UPDATE_DOCUMENT
  } from '../constants/document';

const fetchDocumentData = () => ({
  type: FETCH_DOCUMENT
})

const addDocumentData = (document: Document) => ({
  type: ADD_DOCUMENT,
  data: document
})

const updateDocumentData = (document: Document) => ({
  type: UPDATE_DOCUMENT,
  data: document
})

const removeDocumentData = (id: Id) => ({
  type: REMOVE_DOCUMENT,
  data: id
})
export function fetchDocument() {
  return (dispatch: Function) => {
    dispatch(fetchDocumentData())
  }
}

export function errorDocument(msg: string) {
  notification.error({
    message: ' 获取列表失败!',
    description: msg,
    duration: 2
  })
}

export function removeDocument(id: Id) {
  return (dispatch: Function) => {
    dispatch(removeDocumentData(id))
  }
}

export function updateDocument(Document: Document) {
  return (dispatch: Function) => {
    dispatch(updateDocumentData(Document))
  }
}

export function addDocument(Document: Document) {
  return (dispatch: Function) => {
    dispatch(addDocumentData(Document))
  }
}

export function updateDocumentSuccess(msg: string) {
  notification.success({
    message: '更新成功!',
    description: '更新成功!',
    duration: 1
  })
  return
}

export function updateDocumentError(msg: string) {
  notification.error({
    message: '更新失败!',
    description: '更新失败!',
    duration: 1
  })
  return
}
export function removeDocumentSuccess(msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeDocumentError(msg: string) {
  notification.error({
    message: '移除失败!',
    description: '移除失败!',
    duration: 1
  })
  return
}

export function addDocumentSuccess(msg: string) {
  notification.success({
    message: '添加成功!',
    description: '添加成功!',
    duration: 1
  })
  return
}

export function addDocumentError(msg: string) {
  notification.error({
    message: '添加失败!',
    description: '添加失败!',
    duration: 1
  })
  return
}