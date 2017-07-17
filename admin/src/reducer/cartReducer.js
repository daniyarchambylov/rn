import * as cartAction from '../actions/cart/cart';
import {Map} from 'immutable';

const initialState = new Map({
  products: new Map(),
  totalSum: 0,
});

function updateCart(cart, data, quantity = 1) {
  data.counter = quantity;
  cart = cart.setIn(['products', data.id], data);
  const cartToJS = cart.get('products').toArray();
  cart = cart.set('totalSum', cartToJS.reduce((x, y) => (x.counter * x.price) + (y.counter * y.price)));
  return cart
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartAction.FETCH_ADD_TO_CART:
      state = state.setIn(['products', action.data.id], action.data);
      state = updateCart(state, action.data);
      return state;
    case cartAction.FETCH_REMOVE_FROM_CART:
      state = state.deleteIn(['products', action.data]);
      const cartToJS = state.get('products').toArray();
      return state.set('totalSum', cartToJS.reduce((x, y) => (x.counter * x.price) + (y.counter * y.price)));
    case cartAction.FETCH_CHANGE_QUANTITY:
      return updateCart(state, action.data.product, action.data.quantity);
    case cartAction.FETCH_CLEAR_CART:
      return initialState;

    default:
      return state;
  }

}