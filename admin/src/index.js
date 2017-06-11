import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import SignIn from './components/auth/Signin';

import { Provider } from 'react-redux'

import { Route } from 'react-router'

import { ConnectedRouter } from 'react-router-redux'
import store from './store';
import history from './history';
import DevTools from './containers/DevTools';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ConnectedRouter history={history}>
        <div>
          <h1>Header</h1>
          <Route exact path="/" component={App}/>
          <Route path="/sign-in" component={SignIn}/>
          <h2>Footer</h2>
        </div>
      </ConnectedRouter>
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
