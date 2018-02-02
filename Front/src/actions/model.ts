import { FETCHBASE_MODEL, FETCHCUSTOM_MODEL, ADD_MODEL, UPDATE_MODEL, REMOVE_MODEL } from '../constants/model'
import notification from 'antd/lib/notification';

interface Id {
  id: String
}

interface Model {
  modelDesc: String,
  modelMode: String,
  modelName: String,
  _id?: String
}

const fetchbase_model = () => ({
  type: FETCHBASE_MODEL,
})

const fetchcustom_model = (data: any) => ({
  type: FETCHCUSTOM_MODEL,
  data: data
})

const add_model = (data: any) => ({
  type: ADD_MODEL,
  data: data
})

const update_model = (data: any) => ({
  type: UPDATE_MODEL,
  data: data
})

const remove_model = (data: any) => ({
  type: REMOVE_MODEL,
  data: data
})

// const add_message = (data: any) => ({
//   type: ADD_MESSAGE,
//   data: data
// })

export function fetchBaseModel() {
  return (dispatch: any) => {
    dispatch(fetchbase_model())
  }
}

export function fetchCustomModel(id: Id) {
  return (dispatch: any) => {
    dispatch(fetchcustom_model(id))
  }
}

export function removeModel(id: Id) {
  return (dispatch: any) => {
    dispatch(remove_model(id))
  }
}

export function updateModel(model: Model) {
  return (dispatch: any) => {
    dispatch(update_model(model))
  }
}

export function addModel(model: Model) {
  return (dispatch: any) => {
    dispatch(add_model(model))
  }
}


export function updateModelSuccess (msg: string) {
  notification.success({
    message: '更新成功!',
    description: '更新成功!',
    duration: 1
  })
  return
}

export function updateModelError (msg: string) {
  notification.error({
    message: '更新失败!',
    description:  '更新失败!',
    duration: 1
  })
  return
}
export function removeModelSuccess (msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeModelError (msg: string) {
  notification.error({
    message: '移除失败!',
    description:  '移除失败!',
    duration: 1
  })
  return
}

export function addModelSuccess (msg: string) {
  notification.success({
    message: '添加成功!',
    description: '添加成功!',
    duration: 1
  })
  return
}

export function addModelError (msg: string) {
  notification.error({
    message: '添加失败!',
    description:  '添加失败!',
    duration: 1
  })
  return
}


export function errorModel(msg: string) {
  notification.error({
    message: ' 获取模型失败!',
    description: msg,
    duration: 2
  })
}