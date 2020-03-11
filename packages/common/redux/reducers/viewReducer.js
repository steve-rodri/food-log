import * as types from "../constants";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case types.SET_VIEW:
      if (state.current)
        return {
          current: action.payload,
          previous: state.current
        };
      return {
        current: action.payload
      };
    case types.SET_PREVIOUS:
      return {
        current: state.previous
      };
    default:
      return state;
  }
}
