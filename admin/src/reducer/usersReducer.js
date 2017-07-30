import * as usersAction from '../actions/users/users';
import { Map } from 'immutable';

const initialState = new Map({
  fetching: false,
  companies: new Map(),
  stores: new Map()
});


export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case usersAction.FETCH_USERS:
      return state.set('fetching', true);
    case usersAction.SUCCESS_FETCH_COMPANIES:
      state = arrayToMap(action.payload, state, 'companies');
      state = state.set('fetching', false);
      return state;

      case usersAction.SUCCESS_FETCH_STORES:
      state = arrayToMap(action.payload, state, 'stores');
      state = state.set('fetching', false);
      return state;

    default:
      return state;
  }
}

function arrayToMap(payload, state, storage) {
  payload.forEach(p => state = state.setIn([storage, p.id], p));
  return state;
}