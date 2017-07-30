import API from '../../../api';
import * as signInActions from '../signIn';

export function getSignIn(data) {
  return dispatch => {
    dispatch({ type: signInActions.FETCH_SIGN_IN });
    return API.create(`/sign-in/`, data)
      .then(data => dispatch({ type: signInActions.SUCCESS_FETCH_SIGN_IN, payload: data }));
  }
}

export function signUp(data) {
  return dispatch => {
    dispatch({ type: signInActions.SIGN_UP });
    return API.create(`/sign-up/`, data)
      .then(data => dispatch({ type: signInActions.SUCCESS_SIGN_UP, payload: data }));
  }
}

export function redirectOnSignIn(url) {
  return dispatch => dispatch({ type: signInActions.SET_REDIRECT_URL, payload: url });
}

export function signOut(url) {
  return dispatch => dispatch({ type: signInActions.SIGN_OUT });
}

export function getProfile(token) {
  return dispatch => {
    dispatch({ type: signInActions.FETCH_PROFILE });
    return API.fetch(`/profile/`, null, { token })
      .then(payload => dispatch({ type: signInActions.SUCCESS_FETCH_PROFILE, payload }));
  }
}

export function updateProfile(token, data) {
  return dispatch => {
    dispatch({ type: signInActions.UPDATE_PROFILE });
    return API.update(`/profile/`, data, true, { token })
      .then(payload => dispatch({ type: signInActions.SUCCESS_UPDATE_PROFILE, payload }));
  }
}

export function uploadImage(data, token) {
  return dispatch => {
    const formData = new FormData();
    dispatch({ type: signInActions.UPLOAD_IMAGE });

    formData.append('image',data.image);

    return API.update(`/profile-pic/`, formData, true, { token, headers: {
      'content-type': 'multipart/form-data',
    } })
      .then(data => dispatch({ type: signInActions.SUCCESS_UPLOAD_IMAGE, payload: data }))
  }
}