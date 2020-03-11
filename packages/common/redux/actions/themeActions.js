import * as types from "../constants";

export const setTheme = theme => ({
  type: types.SET_THEME,
  payload: theme
});
