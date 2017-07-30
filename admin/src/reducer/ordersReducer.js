import * as ordersAction from '../actions/orders/orders';
import {Map} from 'immutable';

const initialState = {
  orders: {},
  fetching: false,
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ordersAction.FETCH_ORDERS:
      return {
        ...state,
        fetching: true,
      };

    case ordersAction.SUCCESS_FETCH_ORDERS:
      const orders = {}
      action.payload.forEach(order => {
        orders[order.id] = order
      })

      return {
        ...state,
        orders,
        fetching: false,
      };

    case ordersAction.SUCCESS_FETCH_ORDER_PRODUCTS:
      return {
        ...state,
        orders: {
          ...state.orders,
          [action.payload.id]: {
            ...state.orders[action.payload.id],
            products: action.payload.products,
          },
        },
        fetching: false,
      };

    default:
      return state;
  }

}