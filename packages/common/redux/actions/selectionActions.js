import * as types from "../constants";
import { setView } from "./viewActions";

export function handleSelect(selection, id) {
  return dispatch => {
    dispatch(makeSelection({ ...selection, id }));
    if (selection.contents) {
      dispatch(setView("ExpandedMeal"));
    } else {
      console.log("Food Selected");
    }
  };
}

export const resetSelection = () => ({
  type: types.RESET_SELECTION
});

export const makeSelection = selection => {
  return {
    type: types.MAKE_SELECTION,
    payload: selection
  };
};

export const editSelection = data => {
  return {
    type: types.EDIT_SELECTION,
    payload: data
  };
};
