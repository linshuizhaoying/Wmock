import { combineEpics } from 'redux-observable';

import userEpic from './user'
import messagesEpic from './messages'
export default combineEpics(
  userEpic,
  messagesEpic
);