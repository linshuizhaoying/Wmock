import {
  ERROR_MODEL,
  RECEIVEBASE_MODEL,
  RECEIVECUSTOM_MODEL,
  REMOVE_LOCALMODEL,
  UPDATE_LOCALMODEL
  } from '../constants/model';
const initialState = {
  base: [],
  custom: [],
}
const updateModel = (list: Array<Model>, modelData: Model) => {
  const temp: Array<Model> = []
  list.map((item: Model) => {
    if (item._id === modelData._id) {
      temp.push(modelData)
    } else {
      temp.push(item)
    }
  })
  return temp
}

const removeModel = (list: Array<Model>, id: Id) => {
  const temp: Array<Model> = []
  list.map((item: Model) => {
    if (item._id !== id.id) {
      temp.push(item)
    }
  })
  return temp
}

const model = (state = initialState, action: Action) => {
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
      return {
        ...state,
        custom: action.data.data,
      }
    case UPDATE_LOCALMODEL:
      return {
        ...state,
        custom: updateModel(state.custom, action.data)
      }
    case REMOVE_LOCALMODEL:
      return {
        ...state,
        custom: removeModel(state.custom, action.data)
      }
    default:
      return state
  }
}

export default model;