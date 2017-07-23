import * as errorsAction from '../actions/errors';

const initialState = {};

export default function errorsReducer(state = initialState, action) {
  switch (action.type) {
    case errorsAction.REGISTER_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}