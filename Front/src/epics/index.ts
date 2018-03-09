import { combineEpics } from 'redux-observable';
import userEpic from './user'
import messagesEpic from './messages'
import projectEpic from './project'
import documentEpic from './document'
import teamEpic from './team'
import modelEpic from './model'
import * as io from 'socket.io-client'
import { baseUrl } from '../service/api'
const socket = io(baseUrl);
socket.on('message', (data: DataAny) => {
  console.log('来自服务器的信息:', data)
})
export default combineEpics(
  userEpic,
  messagesEpic,
  projectEpic,
  documentEpic,
  teamEpic,
  modelEpic
);