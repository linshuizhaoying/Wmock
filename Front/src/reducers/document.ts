import { RECEIVE_DOCUMENT, 
  ERROR_DOCUMENT
   // ADD_MESSAGE
 } from '../constants/document';
const initialState = {
data:[]
}

const document = (state = initialState, action: any) => {
// console.log(action)
  switch (action.type) {
  case RECEIVE_DOCUMENT:
  return{
  ...state,
  data: action.data.data,
  }
  case ERROR_DOCUMENT:
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

export default document;