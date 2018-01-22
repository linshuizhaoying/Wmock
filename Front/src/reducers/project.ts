import { RECEIVE_PROJECT, 
         ERROR_PROJECT,
         RECEIVE_UNJOINPROJECT
          // ADD_MESSAGE
        } from '../constants/project';
const initialState = {
   data:[],
   unJoinList:[]
}

const project = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case RECEIVE_PROJECT:
      return{
        ...state,
        data: action.data.data,
      }
    case RECEIVE_UNJOINPROJECT:
      return{
        ...state,
        unJoinList: action.data.data,
      }
    case ERROR_PROJECT:
      return{
        ...state,
        data: []
      }
    // case ADD_PROJECT:
    //   return{
    //     ...state,
    //     data: [...state.data, action.data]
    //   }
    default:
      return state
  }
}

export default project;