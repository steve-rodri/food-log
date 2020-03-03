import * as types from './constants';

const initialState = {
  loading: false,
  auth: false,
  data: {},
  error: ''
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_PENDING:
      return {
        ...state,
        loading: true
      }
    case types.FETCH_USER_REJECTED:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    case types.FETCH_USER_SUCCESS:
      if (!action.payload) {
        return {
          ...state,
          loading: false,
          error: "No Data Fetched"
        }
      } else {
        return {
          ...state,
          loading: false,
          auth: true,
          data: action.payload
        }
      }
    default:
    return state
  }
}
