import { combineEpics } from 'redux-observable';

import userEpic from './user'
import messagesEpic from './messages'
import projectEpic from './project'
import documentEpic from './document'
export default combineEpics(
  userEpic,
  messagesEpic,
  projectEpic,
  documentEpic
);