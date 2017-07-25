import API from '../../../api';
import * as productActions from '../orders';

export function getOrders(token) {
  console.log(token);
  return dispatch => {
    dispatch({ type: productActions.FETCH_ORDERS });
    return API.fetch(`/orders/`, null, { token })
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_ORDERS, payload: data }));
  }
}