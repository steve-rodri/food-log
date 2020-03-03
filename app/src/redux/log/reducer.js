import * as types from './constants'

export default function reducer( state = [], action) {
  switch (action.type) {

    case types.ADD_ITEMS_TO_LOG:
      const items = action.payload
      if (Array.isArray(items) ) {
        return [
          ...state,
          ...items
        ]
      } else {
        return [
          ...state,
          items
        ]
      }

    case types.DELETE_LOG_ITEM:
      return state.filter((item, id) =>
        id !== action.id
      )

    case types.EDIT_LOG_ITEM:
      return state.map(( item, id) =>
        id === action.id?
        { ...item, ...action.payload } : item
      )

    default:
      return state
  }
}
