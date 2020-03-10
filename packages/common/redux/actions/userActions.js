import * as types from "../constants";

export const fetchUserPending = () => ({
  type: types.FETCH_USER_PENDING
});

export const fetchUserRejected = e => ({
  type: types.FETCH_USER_REJECTED,
  error: e
});

export const fetchUserSuccess = user => ({
  type: types.FETCH_USER_SUCCESS,
  payload: user
});
