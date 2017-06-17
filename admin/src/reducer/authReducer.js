import * as signInAction from '../actions/auth/signIn';

const initialState = {
  token: undefined
};

export default function authReducer(state, action) {
  if (state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case signInAction.FETCH_SIGN_IN:
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }

}