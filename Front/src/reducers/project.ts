import {
  ERROR_PROJECT,
  RECEIVE_DEMO,
  RECEIVE_PROJECT,
  RECEIVE_UNJOINPROJECT,
  RECEIVE_VERIFYPROJECT,
  REMOVE_LOCALINTERFACE,
  REMOVE_LOCALPROJECT,
  UPDATE_LOCALINTERFACE,
  UPDATE_LOCALPROJECT
} from '../constants/project';
const initialState = {
  data: [],
  unJoinList: [],
  demo: [],
  verify: ''
}
const updateProject = (list: Array<Project>, projectData: Project) => {
  const temp: Array<Project> = []
  list.map((item: Project) => {
    if (item._id === projectData._id) {
      temp.push(Object.assign({}, item, projectData))
    } else {
      temp.push(item)
    }
  })
  return temp
}

const updateInterface = (list: Array<Project>, inter: Interface) => {
  const temp: Array<Project> = []
  list.map((item: ProjectWithFull) => {
    let tempInterface: Array<Interface> = []
    item.interfaceList.map((interData: Interface) => {
      if (interData._id === inter._id) {
        tempInterface.push(Object.assign({}, interData, inter))
      } else {
        tempInterface.push(interData)
      }
    })
    item.interfaceList = tempInterface
    temp.push(item)
  })
  return temp
}

const removeProject = (list: Array<Project>, id: Id) => {
  const temp: Array<Project> = []
  list.map((item: Project) => {
    if (item._id !== id.id) {
      temp.push(item)
    }
  })
  return temp
}

const removeInterface = (list: Array<Project>, data: ProjectInterface) => {
  const temp: Array<Project> = []
  list.map((item: ProjectWithFull) => {
    if (item._id === data.projectId) {
      let tempInterface: Array<Interface> = []
      item.interfaceList.map((inter: Interface) => {
        if (inter._id !== data.interfaceId) {
          tempInterface.push(inter)
        }
      })
      item.interfaceList = tempInterface
    }
    temp.push(item)
  })
  return temp
}

const project = (state = initialState, action: Action) => {
  switch (action.type) {
    case RECEIVE_PROJECT:
      return {
        ...state,
        data: action.data.data,
      }
    case RECEIVE_DEMO:
      return {
        ...state,
        demo: action.data.data,
      }
    case RECEIVE_VERIFYPROJECT:
      return {
        ...state,
        verify: action.data.data,
      }
    case RECEIVE_UNJOINPROJECT:
      return {
        ...state,
        unJoinList: action.data.data,
      }
    case ERROR_PROJECT:
      return {
        ...state,
        data: []
      }
    case REMOVE_LOCALPROJECT:
      return {
        ...state,
        data: removeProject(state.data, action.data),
        demo: removeProject(state.demo, action.data),
      }
    case UPDATE_LOCALPROJECT:
      return {
        ...state,
        data: updateProject(state.data, action.data),
        demo: updateProject(state.demo, action.data),
      }
    case REMOVE_LOCALINTERFACE:
      return {
        ...state,
        data: removeInterface(state.data, action.data),
        demo: removeInterface(state.demo, action.data),
      }
    case UPDATE_LOCALINTERFACE:
      return {
        ...state,
        data: updateInterface(state.data, action.data),
        demo: updateInterface(state.demo, action.data),
      }
    default:
      return state
  }
}

export default project;