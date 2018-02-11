import notification from 'antd/lib/notification';
import {
  ADD_INTERFACE,
  ADD_PROJECT,
  CLONE_INTERFACE,
  CLONE_PROJECT,
  FETCH_DEMO,
  FETCH_PROJECT,
  FETCH_UNJOINPROJECT,
  IMPORT_PROJECT,
  REMOVE_INTERFACE,
  REMOVE_PROJECT,
  UPDATE_INTERFACE,
  UPDATE_PROJECT,
  VERIFY_PROJECT,
  } from '../constants/project';

const fetchProjectData = (id: Id) => ({
  type: FETCH_PROJECT,
  data: id
})

const importProjectData = (project: Project) => ({
  type: IMPORT_PROJECT,
  data: project
})

const cloneProjectData = (project: CloneProject) => ({
  type: CLONE_PROJECT,
  data: project
})

const cloneInterfaceData = (interfaceData: CloneInterface) => ({
  type: CLONE_INTERFACE,
  data: interfaceData
})

const verifyProjectData = (id: Id) => ({
  type: VERIFY_PROJECT,
  data: id
})

const fetchDemoData = (id: Id) => ({
  type: FETCH_DEMO,
  data: id
})

const fetchUnJoinprojectData = (id: Id) => ({
  type: FETCH_UNJOINPROJECT,
  data: id
})

const addProjectData = (project: ProjectNoId) => ({
  type: ADD_PROJECT,
  data: project
})

const updateProjectData = (project: Project) => ({
  type: UPDATE_PROJECT,
  data: project
})

const removeProjectData = (id: Id) => ({
  type: REMOVE_PROJECT,
  data: id
})

const addInterfaceData = (data: Interface) => ({
  type: ADD_INTERFACE,
  data: data
})

const updateInterfaceData = (data: Interface) => ({
  type: UPDATE_INTERFACE,
  data: data
})

const removeInterfaceData = (id: Id) => ({
  type: REMOVE_INTERFACE,
  data: id
})

export function fetchProject(id: Id) {
  return (dispatch: Function) => {
    dispatch(fetchProjectData(id))
  }
}

export function importProject(project: Project) {
  return (dispatch: Function) => {
    dispatch(importProjectData(project))
  }
}

export function cloneProject(project: CloneProject) {
  return (dispatch: Function) => {
    dispatch(cloneProjectData(project))
  }
}

export function cloneInterface(interfaceData: CloneInterface) {
  return (dispatch: Function) => {
    dispatch(cloneInterfaceData(interfaceData))
  }
}

export function verifyProject(id: Id) {
  return (dispatch: Function) => {
    dispatch(verifyProjectData(id))
  }
}

export function fetchDemo(id: Id) {
  return (dispatch: Function) => {
    dispatch(fetchDemoData(id))
  }
}

export function fetchUnJoinProject(id: Id) {
  return (dispatch: Function) => {
    dispatch(fetchUnJoinprojectData(id))
  }
}

export function removeProject(id: Id) {
  return (dispatch: Function) => {
    dispatch(removeProjectData(id))
  }
}

export function updateProject(project: Project) {
  return (dispatch: Function) => {
    dispatch(updateProjectData(project))
  }
}

export function addProject(project: ProjectNoId) {
  return (dispatch: Function) => {
    dispatch(addProjectData(project))
  }
}

export function removeInterface(id: Id) {
  return (dispatch: Function) => {
    dispatch(removeInterfaceData(id))
  }
}

export function updateInterface(data: Interface) {
  return (dispatch: Function) => {
    dispatch(updateInterfaceData(data))
  }
}

export function addInterface(data: Interface) {
  return (dispatch: Function) => {
    dispatch(addInterfaceData(data))
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

export function addInterfaceSuccess(msg: string) {
  notification.success({
    message: '添加成功!',
    description: '添加成功!',
    duration: 1
  })
  return
}

export function addInterfaceError(msg: string) {
  notification.error({
    message: '添加失败!',
    description: '添加失败!',
    duration: 1
  })
  return
}

export function updateInterfaceSuccess(msg: string) {
  notification.success({
    message: '更新成功!',
    description: '更新成功!',
    duration: 1
  })
  return
}

export function updateInterfaceError(msg: string) {
  notification.error({
    message: '更新失败!',
    description: '更新失败!',
    duration: 1
  })
  return
}

export function removeInterfaceSuccess(msg: string) {
  notification.success({
    message: '移除成功!',
    description: '移除成功!',
    duration: 1
  })
  return
}

export function removeInterfaceError(msg: string) {
  notification.error({
    message: '移除失败!',
    description: '移除失败!',
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

export function verifyProjectSuccess(msg: string) {
  notification.success({
    message: '校验成功!',
    description: '校验成功!',
    duration: 1
  })
  return
}

export function verifyProjectError(msg: string) {
  notification.error({
    message: '校验失败!',
    description: '校验失败!',
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

export function cloneInterfaceSuccess(msg: string) {
  notification.success({
    message: '克隆成功!',
    description: '克隆成功!',
    duration: 1
  })
  return
}

export function cloneInterfaceError(msg: string) {
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