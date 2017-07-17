import * as productActions from '../cart';

export function addToCart(data) {
  return dispatch => {
    return dispatch({ type: productActions.FETCH_ADD_TO_CART, data });
  }
}

export function updateQuantity(data) {
  return dispatch => {
    return dispatch({ type: productActions.FETCH_CHANGE_QUANTITY, data });
  }
}

export function removeFromCart(data) {
  return dispatch => {
    return dispatch({ type: productActions.FETCH_REMOVE_FROM_CART, data });
  }
}

export function clearCart() {
  return dispatch => {
    return dispatch({ type: productActions.FETCH_CLEAR_CART });
  }
}