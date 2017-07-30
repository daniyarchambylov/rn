import API from '../../../api';
import * as productActions from '../orders';

export function getOrders(token) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_ORDERS });
    return API.fetch(`/orders/`, null, { token })
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_ORDERS, payload: data }));
  }
}

export function getOrderProducts(orderId, token) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_ORDER_PRODUCTS });
    return API.fetch(`/orders/${orderId}/products/`, null, { token })
      .then(products => {
        return dispatch({
          type: productActions.SUCCESS_FETCH_ORDER_PRODUCTS,
          payload: { id: orderId, products },
        })
      })
      .then(action => action.payload.products);
  }
}
