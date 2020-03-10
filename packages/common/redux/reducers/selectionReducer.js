import * as types from '../constants';

export default function reducer(state={}, action) {
  switch (action.type) {
    case types.MAKE_SELECTION:
      return action.payload
    case types.EDIT_SELECTION:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
