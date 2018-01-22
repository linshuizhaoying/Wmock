import {
  RECEIVE_TEAM,
  ERROR_TEAM,
  RECEIVEMESSAGES_TEAM
  // ADD_MESSAGE
} from '../constants/team';
const initialState = {
  data: [],
  messages:[],
}

const team = (state = initialState, action: any) => {
  // console.log(action)
  switch (action.type) {
    case RECEIVE_TEAM:
      return {
        ...state,
        data: action.data.data,
      }
    case ERROR_TEAM:
      return {
        ...state,
        data: []
      }
      case RECEIVEMESSAGES_TEAM:
      return{
        ...state,
        messages: action.data,
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

export default team;