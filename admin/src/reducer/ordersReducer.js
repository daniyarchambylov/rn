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
      return {
        ...state,
        orders: action.payload,
        fetching: false,
      };


    default:
      return state;
  }

}