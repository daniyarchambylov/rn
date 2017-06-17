import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import DevTools from './containers/DevTools';
import authReducer from './reducer/authReducer';
import applicationReducer from './reducer/applicationReducer';
import { persistState } from 'redux-devtools';

import history from './history'
const middleware = routerMiddleware(history);

const enhancers = [];

enhancers.push(applyMiddleware(thunkMiddleware, middleware));
enhancers.push(DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

const store = createStore(
  combineReducers({
    auth: authReducer,
    application: applicationReducer,
    router: routerReducer
  }),
  {},
  compose(...enhancers)
);

export default store;
