import API from '../../../api';
import * as productActions from '../product';

export function createProduct(data, token) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_CREATE_PRODUCT });
    return API.create(`/products/`, data, { token })
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_CREATE_PRODUCT, payload: data }))
      .then(action => action.payload)
      ;
  }
}

export function editProduct(data, token) {
  return dispatch => {
    dispatch({ type: productActions.EDIT_PRODUCT_ITEM });
    return API.update(`/products/${data.id}/`, data, false, { token })
      .then(data => dispatch({ type: productActions.SUCCESS_EDIT_PRODUCT_ITEM, payload: data }));
  }
}

export function getProductList(token) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_PRODUCTS_LIST });
    return API.fetch(`/products/`, null, {token})
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_PRODUCTS_LIST, payload: data }));
  }
}
export function getProductItem(productId, token) {
  return dispatch => {
    dispatch({ type: productActions.FETCH_PRODUCT_ITEM });
    return API.fetch(`/products/${productId}`, null, { token })
      .then(data => dispatch({ type: productActions.SUCCESS_FETCH_PRODUCT_ITEM, payload: data }))
      .then(action => action.payload);
  }
}

export function uploadImage(data, token) {
  return dispatch => {
    const formData = new FormData();

    dispatch({ type: productActions.UPLOAD_IMAGE });

    formData.append('image',data.image);
    formData.append('product',data.product);

    return API.create(`/product-images/`, formData, { token, headers: {
      'content-type': 'multipart/form-data',
    } })
      .then(data => dispatch({ type: productActions.SUCCESS_UPLOAD_IMAGE, payload: data }))
  }
}

export function dismissMessage() {
  return dispatch => dispatch({type: productActions.DISMISS_PRODUCT_MESSAGE, payload: null})
}