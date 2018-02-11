import notification from 'antd/lib/notification';
import {
  ADD_MODEL,
  FETCHBASE_MODEL,
  FETCHCUSTOM_MODEL,
  REMOVE_MODEL,
  UPDATE_MODEL
  } from '../constants/model';

// 获取通用的基础Mock模型
const fetchBaseModelData = () => ({
  type: FETCHBASE_MODEL,
})

// 获取当前用户的自定义Mock模型
const fetchCustomModelData = (id: Id) => ({
  type: FETCHCUSTOM_MODEL,
  data: id
})

const addModelData = (model: Model) => ({
  type: ADD_MODEL,
  data: model
})

const updateModelData = (model: Model) => ({
  type: UPDATE_MODEL,
  data: model
})

const removeModelData = (id: Id) => ({
  type: REMOVE_MODEL,
  data: id
})

export function fetchBaseModel() {
  return (dispatch: Function) => {
    dispatch(fetchBaseModelData())
  }
}

export function fetchCustomModel(id: Id) {
  return (dispatch: Function) => {
    dispatch(fetchCustomModelData(id))
  }
}

export function removeModel(id: Id) {
  return (dispatch: Function) => {
    dispatch(removeModelData(id))
  }
}

export function updateModel(model: Model) {
  return (dispatch: Function) => {
    dispatch(updateModelData(model))
  }
}

export function addModel(model: Model) {
  return (dispatch: Function) => {
    dispatch(addModelData(model))
  }
}

export function updateModelSuccess(msg: string) {
  notification.success({
    message: '更新成功!',
    description: '更新成功!',
    duration: 1
  })
  return
}

export function updateModelError(msg: string) {
  notification.error({
    message: '更新失败!',
    description: '更新失败!',
    duration: 1
  })
  return
}
export function removeModelSuccess(msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeModelError(msg: string) {
  notification.error({
    message: '移除失败!',
    description: '移除失败!',
    duration: 1
  })
  return
}

export function addModelSuccess(msg: string) {
  notification.success({
    message: '添加成功!',
    description: '添加成功!',
    duration: 1
  })
  return
}

export function addModelError(msg: string) {
  notification.error({
    message: '添加失败!',
    description: '添加失败!',
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