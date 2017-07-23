import * as productsAction from '../actions/products/product';
import { Map } from 'immutable';

const initialState = new Map({
  fetching: false,
  successMessage: null,
  products: new Map()
});

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case productsAction.FETCH_PRODUCTS_LIST:
      return state.set('fetching', true);
    case productsAction.SUCCESS_FETCH_PRODUCTS_LIST:
      state = arrayToMap(action.payload, state);
      state = state.set('fetching', false);
      return state;

    case productsAction.FETCH_PRODUCT_ITEM:
      return state.set('fetching', true);
    case productsAction.SUCCESS_FETCH_PRODUCT_ITEM:
      state = state.set('fetching', false);
      state = state.setIn(['products', action.payload.id], action.payload);
      return state;

    case productsAction.EDIT_PRODUCT_ITEM:
    case productsAction.FETCH_CREATE_PRODUCT:
      return state.set('fetching', true);
    case productsAction.SUCCESS_FETCH_CREATE_PRODUCT:
      state = state.set('fetching', false);
      state = state.set('successMessage', 'Новый товар успешно добавлен');
      state = state.setIn(['products', action.payload.id], action.payload);
      return state;
    case productsAction.SUCCESS_EDIT_PRODUCT_ITEM:
      state = state.set('fetching', false);
      state = state.set('successMessage', 'Товар успешно обновлен');
      state = state.setIn(['products', action.payload.id], action.payload);
      return state;
    case productsAction.DISMISS_PRODUCT_MESSAGE:
      return state.set('successMessage', null);

    default:
      return state;
  }
}

function arrayToMap(payload, state) {
  payload.forEach(p => state = state.setIn(['products', p.id], p));
  return state;
}