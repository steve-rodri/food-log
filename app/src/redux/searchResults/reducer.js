import * as types from './constants';

export default function reducer( state=null, action ) {
  switch (action.type) {
    case types.SET_RESULTS:
      return action.payload
    case types.CLEAR_RESULTS:
      return null
    default:
      return state
  }
}
