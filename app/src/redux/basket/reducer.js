import * as types from './constants'

const initialState = {
  photo: null,
  title:'',
  contents: []
}

export default function reducer( state = initialState, action) {
  let { contents } = state
  switch (action.type) {
    case types.ADD_BASKET_ITEM:
      return {
        ...state,
        contents: [
          ...state.contents,
          action.payload
        ]
      }
    case types.DELETE_BASKET_ITEM:
      contents = state.contents.filter((item, id) =>
        id !== action.id
      )
      return {
        ...state,
        contents
      }
    case types.EDIT_BASKET_ITEM:
      contents = state.contents.map((item, id) =>
        id === action.id ?
        { ...item, ...action.payload } :
        item
      )
      return {
        ...state,
        contents
      }

    case types.EDIT_BASKET:
      return {
        ...state,
        ...action.payload
      }
    case types.RESET_BASKET:
      return initialState

    case types.ADD_ITEMS_TO_BASKET:
      return {
        ...state,
        contents: [
          ...state.contents,
          ...action.payload
        ]
      }
    default:
      return state
  }
}
