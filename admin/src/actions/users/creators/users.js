import API from '../../../api';
import * as userActions from '../users';

export function getCompanies(token) {
  return dispatch => {
    dispatch({ type: userActions.FETCH_USERS });
    return API.fetch(`/companies/`, null, { token })
      .then(data => dispatch({ type: userActions.SUCCESS_FETCH_COMPANIES, payload: data }));
  }
}

export function getStores(token) {
  return dispatch => {
    dispatch({ type: userActions.FETCH_USERS });
    return API.fetch(`/stores/`, null, { token })
      .then(data => dispatch({ type: userActions.SUCCESS_FETCH_STORES, payload: data }));
  }
}
