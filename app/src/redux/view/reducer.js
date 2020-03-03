import * as types from './actionTypes'

export default function reducer( state={}, action){
  switch (action.type) {
    case types.SET_VIEW:
    if (state.current) return {
        current: action.payload,
        previous: state.current
    }
    return {
      current: action.payload
    }

    default:
      return state
  }
}
