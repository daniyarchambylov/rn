import API from '../../../api';
import * as productActions from '../product';

export function createProduct(data) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_CREATE_PRODUCT });
    return API.create(`/products/`, data)
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_CREATE_PRODUCT, payload: data }));
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
