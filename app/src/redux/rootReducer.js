import { combineReducers } from 'redux';
import user from './user/reducer'
import view from './view/reducer'
import log from './log/reducer'
import basket from './basket/reducer'
import selection from './selection/reducer'
import searchResults from './searchResults/reducer'

export default combineReducers({
  user,
  view,
  log,
  basket,
  selection,
  searchResults
})
