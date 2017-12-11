import { combineReducers } from 'redux';
import user from './user'
import loading from './loading'
import messages from './messages'
export default combineReducers({
  loading,
  user,
  messages,
})