import API from '../../../api';
import * as locationActions from '../location';

export function getLocations() {
  return dispatch => {
    return API.fetch(`/locations/`)
      .then(payload => dispatch({ type: locationActions.SUCCESS_FETCH_CITIES, payload }));
  }
}
