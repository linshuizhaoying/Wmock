import notification from 'antd/lib/notification';
import { FETCH_MESSAGES } from '../constants/messages';

const fetchMessagesData = () => ({
  type: FETCH_MESSAGES
})

export function fetchMessages() {
  return (dispatch: Function) => {
    dispatch(fetchMessagesData())
  }
}

export function errorMessages(msg: string) {
  notification.error({
    message: ' 获取列表失败!',
    description: msg,
    duration: 2
  })
}