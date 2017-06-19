import API from '../../../api';
import * as signInActions from '../signIn';

export function getSignIn(data) {
  return dispatch => {
    dispatch({ type: signInActions.FETCH_SIGN_IN });
    return API.create(`/sign-in/`, data)
      .then(data => dispatch({ type: signInActions.SUCCESS_FETCH_SIGN_IN, payload: data }));
  }
}

export function redirectOnSignIn(url) {
  return dispatch => dispatch({ type: signInActions.SET_REDIRECT_URL, payload: url });
}