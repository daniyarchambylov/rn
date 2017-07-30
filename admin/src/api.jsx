import store from './store';
import * as errorsAction from './actions/errors';
const axios = require('axios');
const locale = 'ru';
const baseUrl = process.env.NODE_ENV === 'production' ? '/api/' : 'http://127.0.0.1:8000/api/';

const apiRequest = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept-Language': locale,
  },
  responseType: 'json',
  withCredentials: false,
  validateStatus: status => status >= 200 && status < 500,
});

apiRequest.interceptors.response.use((response) => {
  const data = response.data;
  if (response.status === 204) {
    return response;
  }
  if (response.status === 401) {
    //store.dispatch({ type: SUCESS_FETCH_SIGNOUT });
    const key = response.config.url.replace(response.config.baseURL, '')
    store.dispatch({type: errorsAction.REGISTER_ERROR, payload: { [ key ] : data } })
    return Promise.reject({ status: 401, errors: data });
  } else if (response.status >= 400) {
    const key = response.config.url.replace(response.config.baseURL, '')
    store.dispatch({type: errorsAction.REGISTER_ERROR, payload: { [key] : data } })
    return Promise.reject({
      status: response.status,
      errors: data,
    });
  }

  return data;
});


function buildOptions(inputOpts, additionalOpts) {
  const token = inputOpts.token;
  delete inputOpts.token;

  let headers = {};

  if (token) {
    headers.Authorization = `JWT ${token}`;
  }

  if (inputOpts.headers) {
    headers = {
      ...headers,
      ...inputOpts.headers,
    }
  }

  return {
    ...inputOpts,
    ...additionalOpts || {},
    headers,
  };
}

export default {
  fetch: function fetch(endpoint, params = null, opts = {}) {
    const options = buildOptions(opts, params);
    return apiRequest.get(endpoint, options);
  },

  create: function create(endpoint, data = {}, opts = {}) {
    const options = buildOptions(opts);
    return apiRequest.post(endpoint, data, options);
  },

  update: function update(endpoint, data = {}, partial = false, opts = {}) {
    const options = buildOptions(opts);
    return partial ?
      apiRequest.patch(endpoint, data, options) :
      apiRequest.put(endpoint, data, options);
  },

  remove: function remove(endpoint, opts = {}) {
    const options = buildOptions(opts);
    return apiRequest.delete(endpoint, options);
  },

  getStaticUrl: function getStaticUrl(relPath) {
    return `${baseUrl}static/react/${relPath}`;
  },
};
