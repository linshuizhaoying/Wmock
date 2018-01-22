import { RECEIVE_MESSAGES, 
         ERROR_MESSAGES
          // ADD_MESSAGE
        } from '../constants/messages';
const initialState = {
   data:[],
   teamMessages:[],
}

const messages = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return{
        ...state,
        data: action.data[0],
        teamMessages:action.data[1]
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

export default messages;