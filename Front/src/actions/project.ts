import {
  ADD_INTERFACE,
  ADD_PROJECT,
  ALL_PROJECT,
  CLONE_INTERFACE,
  CLONE_PROJECT,
  FETCH_DEMO,
  FETCH_PROJECT,
  FETCH_UNJOINPROJECT,
  IMPORT_PROJECT,
  RECOVER_INTERFACE,
  RECOVER_PROJECT,
  REMOVED_INTERFACE,
  REMOVED_PROJECT,
  REMOVE_INTERFACE,
  REMOVE_PROJECT,
  UPDATE_INTERFACE,
  UPDATE_PROJECT,
  VERIFY_PROJECT,
} from '../constants/project';

const fetchProjectData = () => ({
  type: FETCH_PROJECT
})

const allProjectListData = () => ({
  type: ALL_PROJECT
})

const removedInterfaceListData = () => ({
  type: REMOVED_INTERFACE
})

const recoverInterfaceData = (data: AdvanceAny) => ({
  type: RECOVER_INTERFACE,
  data: data
})

const removedProjectListData = () => ({
  type: REMOVED_PROJECT
})

const recoverProjectData = (data: AdvanceAny) => ({
  type: RECOVER_PROJECT,
  data: data
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

const fetchDemoData = () => ({
  type: FETCH_DEMO
})

const fetchUnJoinprojectData = () => ({
  type: FETCH_UNJOINPROJECT
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

export function fetchProject() {
  return (dispatch: Function) => {
    dispatch(fetchProjectData())
  }
}

export function allProjectList() {
  return (dispatch: Function) => {
    dispatch(allProjectListData())
  }
}

export function fetchRemovedInterfaceList() {
  return (dispatch: Function) => {
    dispatch(removedInterfaceListData())
  }
}

export function recoverInterface(data: AdvanceAny) {
  return (dispatch: Function) => {
    dispatch(recoverInterfaceData(data))
  }
}

export function fetchRemovedProjectList() {
  return (dispatch: Function) => {
    dispatch(removedProjectListData())
  }
}

export function recoverProject(data: AdvanceAny) {
  return (dispatch: Function) => {
    dispatch(recoverProjectData(data))
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

export function fetchDemo() {
  return (dispatch: Function) => {
    dispatch(fetchDemoData())
  }
}

export function fetchUnJoinProject() {
  return (dispatch: Function) => {
    dispatch(fetchUnJoinprojectData())
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
