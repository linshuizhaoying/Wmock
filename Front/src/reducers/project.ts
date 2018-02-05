import {
  RECEIVE_PROJECT,
  ERROR_PROJECT,
  RECEIVE_UNJOINPROJECT,
  RECEIVE_DEMO,
  //  UPDATE_LOCALPROJECT,
  REMOVE_LOCALPROJECT,
  UPDATE_LOCALPROJECT,
  RECEIVE_VERIFYPROJECT,
  REMOVE_LOCALINTERFACE,
  UPDATE_LOCALINTERFACE
  // ADD_MESSAGE
} from '../constants/project';
const initialState = {
  data: [],
  unJoinList: [],
  demo: [],
  verify: ''
}
// const updateProject = ( list: any, project: any ) =>{
//   const temp: any[] = []
//   list.map((item: any)=>{
//     if(item._id === project._id){
//       temp.push(project)
//     }else{
//       temp.push(item)
//     }
//   }) 
//   return temp
// }
const updateProject = (list: any, project: any) => {
  const temp: any[] = []
  list.map((item: any) => {
    if (item._id === project._id) {
      temp.push(Object.assign({}, item, project))
    } else {
      temp.push(item)
    }
  })
  return temp
}

const updateInterface = (list: any, inter: any) => {
  const temp: any[] = []
  list.map((item: any) => {
    let tempInterface: any[] = []
    item.interfaceList.map((interData: any) => {
      if (interData._id === inter._id) {
        tempInterface.push(Object.assign({}, interData, inter))
      }else{
        tempInterface.push(interData)
      }
    })
    item.interfaceList = tempInterface
    temp.push(item)
  })
  return temp
}

const removeProject = (list: any, id: any) => {
  const temp: any[] = []
  list.map((item: any) => {
    if (item._id !== id.id) {
      temp.push(item)
    }
  })
  return temp
}
const removeInterface = (list: any, data: any) => {
  const temp: any[] = []
  list.map((item: any) => {
    if (item._id === data.projectId) {
      let tempInterface: any[] = []
      item.interfaceList.map((inter: any) => {
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


const project = (state = initialState, action: any) => {
  // console.log(action)
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