import API from '../../../api';
import * as signInActions from '../signIn';

export function getSignIn(data) {
  return dispatch =>
    API.create(`/sign-in/`, data)
      .then((data) => {
        console.log(data);
        dispatch({
          type: signInActions.FETCH_SIGN_IN,
        });
        return dispatch({ type: signInActions.SUCCESS_FETCH_SIGN_IN, data });
      });
}