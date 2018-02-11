import document from './document';
import loading from './loading';
import messages from './messages';
import model from './model';
import project from './project';
import team from './team';
import user from './user';
import { combineReducers } from 'redux';
export default combineReducers({
  loading,
  user,
  messages,
  project,
  document,
  team,
  model
})