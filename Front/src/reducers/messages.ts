import { DEAL_JOINGROUP, ERROR_MESSAGES, RECEIVE_MESSAGES } from '../constants/messages';
const initialState = {
  data: [],
  teamMessages: [],
}
const removeMessages = (list: Array<Message>, id: string) => {
  const temp: Array<Message> = []
  list.map((item: Message) => {
    if (item._id !== id) {
      temp.push(item)
    }
    return item
  })
  return temp
}

const messages = (state = initialState, action: Action) => {
  // console.log(action)
  switch (action.type) {
    case RECEIVE_MESSAGES:
      return {
        ...state,
        data: action.data[0],
        teamMessages: action.data[1]
      }
    case ERROR_MESSAGES:
      return {
        ...state,
        data: []
      }
    case DEAL_JOINGROUP:
      return {
        ...state,
        teamMessages: removeMessages(state.teamMessages, action.data)
      }
    default:
      return state
  }
}

export default messages;