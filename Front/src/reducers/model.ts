import {
  RECEIVECUSTOM_MODEL,
  RECEIVEBASE_MODEL,
  ERROR_MODEL,
  UPDATE_LOCALMODEL,
  REMOVE_LOCALMODEL
} from '../constants/model';
const initialState = {
  base: [],
  custom:[],
}
const updateModel = ( list: any, model: any ) =>{
  const temp: any[] = []
  list.map((item: any)=>{
    if(item._id === model._id){
      temp.push(model)
    }else{
      temp.push(item)
    }
  }) 
  return temp
}

const removeModel = ( list: any, id: any ) =>{
  const temp: any[] = []
  list.map((item: any)=>{
    if(item._id !== id.id){
      temp.push(item)
    }
  }) 
  return temp
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
    case UPDATE_LOCALMODEL:
      return{
        ...state,
        custom: updateModel(state.custom, action.data)
      }
    case REMOVE_LOCALMODEL:
    return{
      ...state,
      custom: removeModel(state.custom, action.data)
    }
    default:
      return state
  }
}

export default model;