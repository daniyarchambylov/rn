import API from '../../../api';
import * as productActions from '../orders';

export function getOrders(token, isCompany) {
  return dispatch => {
    const endpoint = isCompany ? '/orders/as_company/' : '/orders/'
    dispatch({ type: productActions.FETCH_ORDERS });
    return API.fetch(endpoint, null, { token })
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
