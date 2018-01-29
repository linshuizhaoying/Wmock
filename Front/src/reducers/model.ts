import {
  RECEIVECUSTOM_MODEL,
  RECEIVEBASE_MODEL,
  ERROR_MODEL
} from '../constants/model';
const initialState = {
  base: [],
  custom:[],
}

const model = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case RECEIVEBASE_MODEL:
      return {
        ...state,
        base: action.data.data,
      }
    case ERROR_MODEL:
      return {
        ...state,
        base: [],
        custom: []
      }
      case RECEIVECUSTOM_MODEL:
      return{
        ...state,
        custom: action.data.data,
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

export default model;