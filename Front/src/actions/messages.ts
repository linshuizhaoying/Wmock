
import { FETCH_MESSAGES } from '../constants/messages';

const fetchMessagesData = () => ({
  type: FETCH_MESSAGES
})

export function fetchMessages() {
  return (dispatch: Function) => {
    dispatch(fetchMessagesData())
  }
}
