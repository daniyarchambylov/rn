import * as signInAction from '../actions/auth/signIn';

const initialState = {
  token: undefined,
  fetching: false,
  signedIn: false,
  redirectTo: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case signInAction.FETCH_SIGN_IN:
      return {
        ...state,
        fetching: true,
      };
    case signInAction.SUCCESS_FETCH_SIGN_IN:
      return {
        ...state,
        fetching: false,
        token: action.payload.token,
        signedIn: true,
      };
    case signInAction.SET_REDIRECT_URL:
      return {
        ...state,
        redirectTo: action.payload,
      };
    default:
      return state;
  }

}