import { combineReducers } from 'redux';
import user from './userReducer'
import view from './viewReducer'
import log from './logReducer'
import basket from './basketReducer'
import selection from './selectionReducer'
import searchResults from './resultsReducer'

export default combineReducers({
  user,
  view,
  log,
  basket,
  selection,
  searchResults
})
