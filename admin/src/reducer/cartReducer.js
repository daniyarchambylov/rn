import * as cartAction from '../actions/cart/cart';
import {Map} from 'immutable';

const initialState = new Map({
  products: new Map()
});

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartAction.FETCH_ADD_TO_CART:
      state = state.setIn(['products', action.data.id], action.data);
      return state;
    case cartAction.FETCH_REMOVE_FROM_CART:
      state = state.deleteIn(['products', action.data]);
      return state;
    case cartAction.FETCH_CLEAR_CART:
      return initialState;

    default:
      return state;
  }

}