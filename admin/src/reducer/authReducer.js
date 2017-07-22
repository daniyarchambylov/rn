import * as signInAction from '../actions/auth/signIn';

const initialState = {
  token: undefined,
  fetching: false,
  signedIn: false,
  redirectTo: null,
  profile: {},
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
    case signInAction.SUCCESS_FETCH_PROFILE:
    case signInAction.SUCCESS_UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case signInAction.SIGN_OUT:
      return initialState;
    default:
      return state;
  }

}