import * as cartAction from '../actions/cart/cart';
import {Map} from 'immutable';

const initialState = new Map({
  fetching: false,
  products: new Map(),
  totalSum: 0,
  order: {}
});

function updateCart(cart, data, quantity = 1) {
  data.counter = quantity;
  data.total_price = quantity * data.price;
  cart = cart.setIn(['products', data.id], data);
  const cartToJS = cart.get('products').toArray();
  cart = cart.set('totalSum', cartToJS.reduce(function(sum, value) { return sum + (value.counter * value.price); }, 0));
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
      return state.set('totalSum', cartToJS.reduce(function(sum, value) { return sum + (value.counter * value.price); }, 0));
    case cartAction.FETCH_CHANGE_QUANTITY:
      return updateCart(state, action.data.product, action.data.quantity);
    case cartAction.FETCH_CLEAR_CART:
      return initialState;

    case cartAction.CREATE_ORDER:
      state = state.set('order', {});
      return state.set('fetching', true);

    case cartAction.SUCCESS_CREATE_ORDER:
      state = state.set('fetching', false);
      return state.set('order', action.payload);


    default:
      return state;
  }

}