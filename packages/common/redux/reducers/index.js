import { combineReducers } from "redux";
import user from "./userReducer";
import view from "./viewReducer";
import log from "./logReducer";
import basket from "./basketReducer";
import selection from "./selectionReducer";
import searchResults from "./resultsReducer";
import theme from "./themeReducer";

export default combineReducers({
  theme,
  user,
  view,
  log,
  basket,
  selection,
  searchResults
});
