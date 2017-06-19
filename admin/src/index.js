import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './css/index.css';
import SignIn from './components/auth/Signin';

import { Provider } from 'react-redux';

import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'react-router-redux';
import store from './store';
import history from './history';
import Products from './components/products/Product';
import AboutUs from './components/static-pages/About';
import Agreement from './components/static-pages/Agreement';
import UserProfile from './components/profile/UserProfile';
import CompaniesList from './components/companies/CompaniesList';
import ContactUs from './components/static-pages/ContactUs';
import OrdersList from './components/orders/OrdersList';
import LazilyLoad, { importLazy } from './components/LazyLoad';
import SignedInContainer from './containers/SignedIn';

ReactDOM.render(
  <Provider store={store}>
    <div className='root-inner'>
      <ConnectedRouter history={history}>
        <div className='router-wrapper'>
          <LazilyLoad modules={{ Header: () => importLazy(import('./components/Header')), }}>
            {({ Header }) => (
              <Header />
            )}
          </LazilyLoad>

          <Switch>
            <Route path="/sign-in" component={SignIn}/>
            <Route path="/about-us" component={AboutUs}/>
            <Route path="/user-agreement" component={Agreement}/>

            <SignedInContainer>
              <Switch>
                <Route path="/" exact component={App} />
                <Route path="/products" component={Products}/>
                <Route path="/user-profile" component={UserProfile}/>
                <Route path="/companies" component={CompaniesList}/>
                <Route path="/contact-us" component={ContactUs}/>
                <Route path="/orders" component={OrdersList}/>
              </Switch>
            </SignedInContainer>
          </Switch>
        </div>
      </ConnectedRouter>
      <LazilyLoad modules={{ DevTools: () => importLazy(import('./containers/DevTools')), }}>
        {({ DevTools }) => (
          <DevTools />
        )}
      </LazilyLoad>
    </div>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
