import { combineReducers } from 'redux';
import user from './user'
import loading from './loading'
import messages from './messages'
import project from './project'
import document from './document'
import team from './team'
import model from './model'
export default combineReducers({
  loading,
  user,
  messages,
  project,
  document,
  team,
  model
})