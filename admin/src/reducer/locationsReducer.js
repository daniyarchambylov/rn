import * as locationAction from '../actions/location/location';

const initialState = {
  location: {},
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case locationAction.SUCCESS_FETCH_CITIES:
      return {
        ...state,
        location: action.payload
      }

    default:
      return state;
  }
}
