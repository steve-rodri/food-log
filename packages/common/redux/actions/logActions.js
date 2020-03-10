import * as types from "../constants";
import store from "../store";
import { setView } from "./viewActions";
import { makeSelection, resetSelection } from "./selectionActions";

export const addBasketToLog = title => {
  return dispatch => {
    const state = store.getState();
    let { basket } = state;
    if (basket.contents.length > 1) {
      if (title) basket.title = title;
      dispatch(addItemsToLog(basket));
    } else {
      dispatch(addItemsToLog(basket.contents));
    }
  };
};

export const addItemsToLog = data => {
  return {
    type: types.ADD_ITEMS_TO_LOG,
    payload: data
  };
};

export const deleteLogItem = id => {
  return {
    type: types.DELETE_LOG_ITEM,
    id
  };
};

export const editLogItem = (id, data) => {
  return {
    type: types.EDIT_LOG_ITEM,
    payload: data,
    id
  };
};

export const deleteLogMealItem = contentId => {
  return dispatch => {
    const state = store.getState();
    const selection = { ...state.selection };
    selection.contents = selection.contents.filter(
      (item, id) => id !== contentId
    );
    //if no contents
    if (!selection.contents.length) {
      //delete item from log
      dispatch(deleteLogItem(selection.id));
      dispatch(resetSelection());
      dispatch(setView("Log"));
    } else {
      //else update log item
      dispatch(editLogItem(selection.id, selection));
      dispatch(makeSelection(selection));
    }
  };
};
