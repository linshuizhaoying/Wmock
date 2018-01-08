import { combineEpics } from 'redux-observable';

import userEpic from './user'
import messagesEpic from './messages'
import projectEpic from './project'
export default combineEpics(
  userEpic,
  messagesEpic,
  projectEpic
);