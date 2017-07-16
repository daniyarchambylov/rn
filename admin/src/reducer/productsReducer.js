import * as productsAction from '../actions/products/product';
import { Map } from 'immutable';

const initialState = new Map({
  fetching: false,
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
      state.set('fetching', false);
      state = state.setIn(['products', action.payload.id], action.payload);
      return state;

    default:
      return state;
  }
}

function arrayToMap(payload, state) {
  payload.forEach(p => state = state.setIn(['products', p.id], p));
  return state;
}