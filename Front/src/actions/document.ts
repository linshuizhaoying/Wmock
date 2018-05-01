import {
  ADD_DOCUMENT,
  FETCH_DOCUMENT,
  FETCH_DOCUMENTMESSAGES,
  RECOVER_DOCUMENT,
  REMOVED_DOCUMENT,
  REMOVE_DOCUMENT,
  UPDATE_DOCUMENT
} from '../constants/document';

import notification from 'antd/lib/notification';

const fetchDocumentData = () => ({
  type: FETCH_DOCUMENT,
})

const fetchDocumentMessagesData = (id: Id) => ({
  type: FETCH_DOCUMENTMESSAGES,
  data: id
})

const removedDocumentListData = () => ({
  type: REMOVED_DOCUMENT
})

const recoverDocumentData = (data: AdvanceAny) => ({
  type: RECOVER_DOCUMENT,
  data: data
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

export function fetchDocumentMessages(id: Id) {
  return (dispatch: Function) => {
    dispatch(fetchDocumentMessagesData(id))
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

export function fetchRemovedDocumentList() {
  return (dispatch: Function) => {
    dispatch(removedDocumentListData())
  }
}

export function recoverDocument(data: AdvanceAny) {
  return (dispatch: Function) => {
    dispatch(recoverDocumentData(data))
  }
}