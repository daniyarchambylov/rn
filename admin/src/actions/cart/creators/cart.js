import API from '../../../api';
import * as cartActions from '../cart';

export function addToCart(data) {
  return dispatch => {
    return dispatch({ type: cartActions.FETCH_ADD_TO_CART, data });
  }
}

export function updateQuantity(data) {
  return dispatch => {
    return dispatch({ type: cartActions.FETCH_CHANGE_QUANTITY, data });
  }
}

export function removeFromCart(data) {
  return dispatch => {
    return dispatch({ type: cartActions.FETCH_REMOVE_FROM_CART, data });
  }
}

export function clearCart() {
  return dispatch => {
    return dispatch({ type: cartActions.FETCH_CLEAR_CART });
  }
}

export function createOrder(data, token) {
  return dispatch => {
    dispatch({ type: cartActions.CREATE_ORDER });
    return API.create(`/orders/`, data, { token })
      .then(data => dispatch({ type: cartActions.SUCCESS_CREATE_ORDER, payload: data }))
      .then(action => action.payload)
      ;
  }
}