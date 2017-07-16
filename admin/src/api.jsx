import store from './store';
const axios = require('axios');
const locale = 'ru';
const baseUrl = 'http://127.0.0.1:8001/';

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
    return Promise.reject({ status: 401, errors: data });
  } else if (response.status >= 400) {
    return Promise.reject({
      status: response.status,
      errors: data,
    });
  }

  return data;
});


function addToken(hdrs) {
  const headers = hdrs || {};
  const token = store.getState().auth.user.token;
  return token !== undefined ? { ...headers, Authorization: `Token ${token}` } : headers;
}

function buildOptions(inputOpts, additionalOpts) {
  //const headers = addToken(inputOpts.headers);
  const headers = {};
  return {
    ...inputOpts,
    ...additionalOpts || {},
    headers,
  };
}

export default {
  fetch: function fetch(endpoint, isAuth = false, params = null, opts = {}) {
    const options = buildOptions(opts, params);
    return apiRequest.get(endpoint, options);
  },

  create: function create(endpoint, data = {}, opts = {}) {
    const options = buildOptions(opts);
    opts.headers = {
      Authorization: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6IiIsInVzZXJuYW1lIjoiOTk2NTU1MDAwMDAwIiwiZXhwIjoxNTAwMTQwMTM5LCJwaG9uZSI6Ijk5NjU1NTAwMDAwMCJ9.fdTfzSVnIoPuW-4QR_S6B6yPOD9U2nSodamALtexROc',
    };
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
