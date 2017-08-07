import API from '../../../api';
import * as locationActions from '../location';

export function getLocations() {
  return dispatch => {
    return API.fetch(`/locations/`)
      .then(payload => dispatch({ type: locationActions.SUCCESS_FETCH_CITIES, payload }));
  }
}

export function saveCitiesSettings(token, data) {
  return dispatch => {
    return API.update(`/save-cities/`, {
      filtered_cities: data,
    }, true, { token })
      .then(payload => dispatch({ type: locationActions.SAVE_CITIES_SETTINGS, payload }));
  }
}
