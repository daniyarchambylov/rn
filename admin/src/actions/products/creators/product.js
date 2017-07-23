import API from '../../../api';
import * as productActions from '../product';

export function createProduct(data, token) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_CREATE_PRODUCT });
    return API.create(`/products/`, data, { token })
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_CREATE_PRODUCT, payload: data }));
  }
}

export function editProduct(data, token) {
  return dispatch => {
    dispatch({ type: productActions.EDIT_PRODUCT_ITEM });
    return API.update(`/products/${data.id}/`, data, false, { token })
      .then(data => dispatch({ type: productActions.SUCCESS_EDIT_PRODUCT_ITEM, payload: data }));
  }
}

export function getProductList() {
  return dispatch => {
    dispatch({ type: productActions.FETCH_PRODUCTS_LIST });
    return API.fetch(`/products/`)
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_PRODUCTS_LIST, payload: data }));
  }
}
export function getProductItem(productId) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_PRODUCT_ITEM });
    return API.fetch(`/products/${productId}`)
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_PRODUCT_ITEM, payload: data }))
      .then(action => action.payload);
  }
}

export function dismissMessage() {
  return dispatch => dispatch({type: productActions.DISMISS_PRODUCT_MESSAGE, payload: null})
}