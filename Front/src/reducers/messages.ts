import { RECEIVE_MESSAGES, 
         ERROR_MESSAGES
          // ADD_MESSAGE
        } from '../constants/messages';
const initialState = {
   data:[]
}

const user = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return{
        ...state,
        data: action.data.data,
      }
    case ERROR_MESSAGES:
      return{
        ...state,
        data: []
      }
    // case ADD_MESSAGE:
    //   return{
    //     ...state,
    //     data: [...state.data, action.data]
    //   }
    default:
      return state
  }
}

export default user;