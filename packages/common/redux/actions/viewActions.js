import * as types from "../constants";
export const setView = view => {
  return {
    type: types.SET_VIEW,
    payload: view
  };
};

export const setPrevious = () => {
  return {
    type: types.SET_PREVIOUS
  };
};
