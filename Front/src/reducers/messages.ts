import { RECEIVE_MESSAGES, 
         ERROR_MESSAGES,
         DEAL_JOINGROUP
          // ADD_MESSAGE
        } from '../constants/messages';
const initialState = {
   data:[],
   teamMessages:[],
}
const removeMessages = ( list: any, id: string ) =>{
  // console.log(list)
  // console.log(id)
  const temp: any[] = []
  list.map((item: any)=>{
    if(item._id !== id){
      temp.push(item)
    }
    return item
  }) 
  return temp
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
    case DEAL_JOINGROUP:
      return{
        ...state,
        teamMessages: removeMessages(state.teamMessages, action.data)
      }
    default:
      return state
  }
}

export default messages;