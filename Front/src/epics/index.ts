import { combineEpics } from 'redux-observable';

import userEpic from './user'

export default combineEpics(
  userEpic
);