import * as types from "../constants";

export const setResults = data => ({
  type: types.SET_RESULTS,
  payload: data
});

export const clearResults = () => ({
  type: types.CLEAR_RESULTS
});
