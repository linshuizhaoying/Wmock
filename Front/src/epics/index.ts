import { combineEpics } from 'redux-observable';
import userEpic from './user'
import messagesEpic from './messages'
import projectEpic from './project'
import documentEpic from './document'
import teamEpic from './team'
import modelEpic from './model'

export default combineEpics(
  userEpic,
  messagesEpic,
  projectEpic,
  documentEpic,
  teamEpic,
  modelEpic
);