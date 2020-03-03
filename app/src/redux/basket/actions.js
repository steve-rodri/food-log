import * as types from './constants'

export const resetBasket = () => ({
  type: types.RESET_BASKET
})

export const editBasket = (data) => {
  return {
    type: types.EDIT_BASKET,
    payload: data
  }
}

export const addItemsToBasket = (data) => {
  return {
    type: types.ADD_ITEMS_TO_BASKET,
    payload: data
  }
}

export const addBasketItem = (data) => {
  return {
    type: types.ADD_BASKET_ITEM,
    payload: data
  }
}

export const deleteBasketItem = (id) => {
  return {
    type: types.DELETE_BASKET_ITEM,
    id
  }
}

export const editBasketItem = (id, data) => {
  return {
    type: types.EDIT_BASKET_ITEM,
    id,
    payload: data
  }
}
