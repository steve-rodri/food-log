import * as types from "../constants";

export default function reducer(state = "dark", action) {
  switch (action.type) {
    case types.SET_THEME:
      return action.payload;
    default:
      return state;
  }
}
