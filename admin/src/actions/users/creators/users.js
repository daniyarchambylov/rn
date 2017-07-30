import API from '../../../api';
import * as userActions from '../users';

export function getCompanies() {
  return dispatch => {
    dispatch({ type: userActions.FETCH_USERS });
    return API.fetch(`/companies/`)
      .then(data => dispatch({ type: userActions.SUCCESS_FETCH_COMPANIES, payload: data }));
  }
}

export function getStores() {
  return dispatch => {
    dispatch({ type: userActions.FETCH_USERS });
    return API.fetch(`/stores/`)
      .then(data => dispatch({ type: userActions.SUCCESS_FETCH_STORES, payload: data }));
  }
}
