// // 需要主动处理的是用户的上下线
import {
  USER_LOGINSUCCESS, // 用户登录成功
  USER_REGSUCCESS, // 用户注册成功
  USER_LOGOUT
} from '../constants/user'

import io from 'socket.io-client'
const socket = io();
export const createSocketMiddleware = () => {
  let firstInit = false
  return (store: DataAny) => (next: any) => (action: Action) => {
    if (!firstInit) {
      firstInit = true
      socket.on('message', (data: DataAny) => {
        console.log('私人聊天信息:', data)
      })
    }

    // 用户登录注册成功后,发送信息给服务器。
    if (action.type === USER_LOGINSUCCESS || action.type === USER_REGSUCCESS) {
      socket.emit('userLogin', { token: localStorage.getItem('token') });
      console.log('发送登录信息给服务器')
    }

    if (action.type === USER_LOGOUT) {
      socket.emit('userLogout', { token: localStorage.getItem('token') });
    }

    return;
  }
}
export default createSocketMiddleware