import { FETCH_PROJECT, FETCH_UNJOINPROJECT, FETCH_DEMO, ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT, IMPORT_PROJECT, CLONE_PROJECT } from '../constants/project'
import notification from 'antd/lib/notification';

const fetch_project = (data: any) => ({
  type: FETCH_PROJECT,
  data: data
})


const import_project = (data: any) => ({
  type: IMPORT_PROJECT,
  data: data
})

const clone_project = (data: any) => ({
  type: CLONE_PROJECT,
  data: data
})


const fetch_demo = (data: any) => ({
  type: FETCH_DEMO,
  data: data
})

const fetch_unJoinproject = (data: any) => ({
  type: FETCH_UNJOINPROJECT,
  data: data
})

const add_project = (data: any) => ({
  type: ADD_PROJECT,
  data: data
})

const update_project = (data: any) => ({
  type: UPDATE_PROJECT,
  data: data
})

const remove_project = (data: any) => ({
  type: REMOVE_PROJECT,
  data: data
})


// const add_message = (data: any) => ({
//   type: ADD_MESSAGE,
//   data: data
// })

export function fetchProject(user: any) {
  return (dispatch: any) => {
    dispatch(fetch_project(user))
  }
}

export function importProject(data: any) {
  return (dispatch: any) => {
    dispatch(import_project(data))
  }
}

export function cloneProject(data: any) {
  return (dispatch: any) => {
    dispatch(clone_project(data))
  }
}

export function fetchDemo(user: any) {
  return (dispatch: any) => {
    dispatch(fetch_demo(user))
  }
}

export function fetchUnJoinProject(user: any) {
  return (dispatch: any) => {
    dispatch(fetch_unJoinproject(user))
  }
}


export function removeProject(id: Id) {
  return (dispatch: any) => {
    dispatch(remove_project(id))
  }
}

export function updateProject(project: Project) {
  return (dispatch: any) => {
    dispatch(update_project(project))
  }
}

export function addProject(project: Project) {
  return (dispatch: any) => {
    dispatch(add_project(project))
  }
}


export function updateProjectSuccess(msg: string) {
  notification.success({
    message: '更新成功!',
    description: '更新成功!',
    duration: 1
  })
  return
}

export function updateProjectError(msg: string) {
  notification.error({
    message: '更新失败!',
    description: '更新失败!',
    duration: 1
  })
  return
}
export function removeProjectSuccess(msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeProjectError(msg: string) {
  notification.error({
    message: '移除失败!',
    description: '移除失败!',
    duration: 1
  })
  return
}

export function addProjectSuccess(msg: string) {
  notification.success({
    message: '添加成功!',
    description: '添加成功!',
    duration: 1
  })
  return
}

export function addProjectError(msg: string) {
  notification.error({
    message: '添加失败!',
    description: '添加失败!',
    duration: 1
  })
  return
}
export function importProjectSuccess(msg: string) {
  notification.success({
    message: '导入成功!',
    description: '导入成功!',
    duration: 1
  })
  return
}

export function importProjectError(msg: string) {
  notification.error({
    message: '导入失败!',
    description: '导入失败!',
    duration: 1
  })
  return
}

export function cloneProjectSuccess(msg: string) {
  notification.success({
    message: '克隆成功!',
    description: '克隆成功!',
    duration: 1
  })
  return
}

export function cloneProjectError(msg: string) {
  notification.error({
    message: '克隆失败!',
    description: '克隆失败!',
    duration: 1
  })
  return
}


export function errorProject(msg: string) {
  notification.error({
    message: ' 获取列表失败!',
    description: msg,
    duration: 2
  })
}