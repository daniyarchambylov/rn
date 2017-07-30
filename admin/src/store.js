import thunkMiddleware from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import DevTools from './containers/DevTools';
import authReducer from './reducer/authReducer';
import applicationReducer from './reducer/applicationReducer';
import productsReducer from './reducer/productsReducer';
import cartReducer from './reducer/cartReducer';
import errorsReducer from './reducer/errorsReducer';
import ordersReducer from './reducer/ordersReducer';
import { persistState } from 'redux-devtools';
import { loadState, saveState } from './localStorage'

import history from './history'
import usersReducer from "./reducer/usersReducer"
const middleware = routerMiddleware(history);

const enhancers = [];

enhancers.push(applyMiddleware(thunkMiddleware, middleware));

const persistedState = loadState();

if (process.env.NODE_ENV !== 'production') {
  enhancers.push(DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    )
  );
}

const store = createStore(
  combineReducers({
    auth: authReducer,
    application: applicationReducer,
    products: productsReducer,
    cart: cartReducer,
    errors: errorsReducer,
    orders: ordersReducer,
    users: usersReducer,
    router: routerReducer
  }),
  persistedState,
  compose(...enhancers)
);

//persistStore(store);

store.subscribe(() => {
  saveState({
    auth: store.getState().auth,
  })
});
export default store;
